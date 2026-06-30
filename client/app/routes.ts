import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/Login.tsx"),

    layout("routes/protected/layout.tsx", [
        route("dashboard", "routes/protected/Dashboard.tsx"),
        route("admins", "routes/protected/Admins.tsx"),
        route("doctors", "routes/protected/Doctors.tsx"),
        route("nurses", "routes/protected/Nurses.tsx"),
        route("patients", "routes/protected/Patients.tsx"),
        route("activities-log", "routes/protected/ActivitiesLog.tsx"),
        route("profile/:id", "routes/protected/Profile.tsx"),
        route("financial-history", "routes/protected/FinancialHistory.tsx"),

        route("pharmacy", "routes/protected/UnderConstruction.tsx", { id: "uc-pharmacy" }),
        route("pharmacy/dispense", "routes/protected/UnderConstruction.tsx", { id: "uc-pharmacy-dispense" }),
        route("pharmacy/inventory", "routes/protected/UnderConstruction.tsx", { id: "uc-pharmacy-inventory" }),
        route("pharmacy/prescriptions", "routes/protected/UnderConstruction.tsx", { id: "uc-pharmacy-prescriptions" }),
        
        route("lab", "routes/protected/UnderConstruction.tsx", { id: "uc-lab" }),
        route("lab/requests", "routes/protected/UnderConstruction.tsx", { id: "uc-lab-requests" }),
        route("lab/results", "routes/protected/UnderConstruction.tsx", { id: "uc-lab-results" }),
        
        route("appointments", "routes/protected/UnderConstruction.tsx", { id: "uc-appointments" }),
        route("telemedicine", "routes/protected/UnderConstruction.tsx", { id: "uc-telemedicine" }),
        
        route("settings", "routes/protected/UnderConstruction.tsx", { id: "uc-settings" }),
        route("settings/general", "routes/protected/UnderConstruction.tsx", { id: "uc-settings-general" }),
        route("settings/roles", "routes/protected/UnderConstruction.tsx", { id: "uc-settings-roles" }),
        route("settings/billing", "routes/protected/UnderConstruction.tsx", { id: "uc-settings-billing" }),

        route("*", "routes/NotFound.tsx", { id: "not-found-protected" }),
    ]),
    route("*", "routes/NotFound.tsx", { id: "not-found-public" }),
] satisfies RouteConfig;
