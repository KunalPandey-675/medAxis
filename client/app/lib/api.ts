import type {
    PaginatedResponse,
    Role,
    User,
    LabResult,
    WebPushSubscription,
    ActivityLog,
    invoice,
    appointment,
} from "@/types";


export const API_URL = "http://localhost:5000/api";

export const getUsers = async (params: {
    role: Role;
    page?: number;
    limit?: number;
}): Promise<PaginatedResponse<User>> => {
    const query = new URLSearchParams({
        role: params.role,
        page: (params.page || 1).toString(),
        limit: (params.limit || 10).toString(),
    }).toString();

    const res = await fetch(`${API_URL}/users?${query}`, {
        credentials: "include", // Important for Better Auth cookies
    });

    if (!res.ok) throw new Error("Failed");

    return res.json();
};

export const triggerAdmission = async ({
    patientId,
    admissionReason,
}: {
    patientId: string;
    admissionReason: string;
}) => {
    // /:id/admit
    const res = await fetch(`${API_URL}/users/${patientId}/admit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admissionReason }),
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to start admission process");
    return res.json();
};

interface UpdateUserParams {
    userId: string;
    userData: Partial<User> & Record<string, any>; // Allow custom fields
}


// /update/:id
export const updateUser = async ({ userId, userData }: UpdateUserParams) => {
    const res = await fetch(`${API_URL}/users/update/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include", // Important for Better Auth cookies
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update user");
    }

    return res.json();
};

export const createActityLog = async (data: {
    userId: string;
    action: string;
    details?: string;
}) => {
    const res = await fetch(`${API_URL}/activity-logs/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // Important for Better Auth cookies
    });
    if (!res.ok) throw new Error("Failed to create activity log");
    return res.json();
};

export const getPatientLabResults = async (
    patientId: string,
): Promise<LabResult[]> => {
    const res = await fetch(`${API_URL}/lab-results/patient/${patientId}`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch lab results");
    return res.json();
};


export const updateLabResult = async ({
    id,
    data,
}: {
    id: string;
    data: { doctorNotes?: string; status?: string };
}) => {
    const res = await fetch(`${API_URL}/lab-results/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to update lab result");
    return res.json();
};



export const createLabResult = async (data: {
    patientId: string;
    testType: string;
    bodyPart: string;
    imageUrl: string;
    aiAnalysis?: string;
}) => {
    const res = await fetch(`${API_URL}/lab-results`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include", // Important for Better Auth cookies
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create lab result");
    }

    return res.json();
};

export const deleteFile = async ({ file }: { file: string }) => {
  const res = await fetch(`${API_URL}/uploadthing/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fileUrl: file }),
    credentials: "include", // Important for Better Auth cookies
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete file");
  }

  return res.json();
};