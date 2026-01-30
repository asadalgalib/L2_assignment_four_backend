import { prisma } from "../../lib/prisma"

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
// * Create Qualifications
const createQualification = async (data: { tutorId: string, exam: string, year: string, gpa: string, group: string, institute: string }) => {
    const result = await prisma.qualification.create({
        data
    })
    return {
        success: true,
        data: result
    }
}
// * Create Category 
const createCategry = async (data: { tutorId: string, category: string }) => {
    if (!data) throw new Error("Tutor ID is missing");
    const result = await prisma.categories.create({
        data: {
            category: data.category,
            tutorId: data.tutorId
        }
    })
    return {
        success: true,
        data: result
    }
}

export const tutorServices = {
    createTutionInfo,
    createQualification,
    createCategry
}