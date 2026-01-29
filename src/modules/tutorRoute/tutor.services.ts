import { prisma } from "../../lib/prisma"

enum GENDER {
    Male = "Male",
    Female = "Female"
}
// * Create Tutor Profile
const createTutorProfile = async (gender: GENDER, tutorId: string) => {
    const result = await prisma.tutorProfile.create({
        data: {
            tutorId,
            gender
        }
    })
    return {
        success: true,
        data: result
    }
}
// * Create Tution Info
const createTutionInfo = async ({
    tutorId, availability, salary, subjects, availableTime, startDate, endDate
}: {
    tutorId: string; availability: boolean; salary: number, subjects: string[], availableTime: string, startDate: string, endDate: string
}) => {
    const result = await prisma.tutionInfo.create({
        data: { tutorId, availability, salary, subjects, availableTime, startDate, endDate }
    })
    return {
        success: true,
        data: result
    }
}

export const tutorServices = {
    createTutorProfile,
    createTutionInfo
}