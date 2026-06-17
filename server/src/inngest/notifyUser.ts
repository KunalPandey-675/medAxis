import Notification from "../models/notification"

export const notifyUser = async (
    doctorId: string,
    nurseId: string,
    title: string,
    message: string,
    link: string,
    type: "system" | "assignment" | "lab_result" | "alert",
) => {
    await Notification.create({
        user: doctorId,
        title,
        message,
        link,
        type,
    })

    await Notification.create({
        user: nurseId,
        title,
        message,
        link,
        type,
    })
}