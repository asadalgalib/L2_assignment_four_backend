import { prisma } from "../../lib/prisma"

// * Create Tution Info
const createTutionInfo = async ({
    tutorId,
    availability,
    salary,
    subjects,
    availableTime,
    startDate,
    endDate
}: {
    tutorId: string;
    availability: boolean;
    salary: number,
    subjects: string[],
    availableTime: string,
    startDate: string,
    endDate: string
}) => {
    const result = await prisma.tutionInfo.create({
        data: { tutorId, availability, salary, subjects, availableTime, startDate, endDate }
    })
    return {
        success: true,
        data: result
    }
}
// * Update Tution Info
const updateTutionInfo = async ({
    id,
    availability,
    salary,
    subjects,
    availableTime,
    startDate,
    endDate
}: {
    id: string;
    availability: boolean;
    salary: number,
    subjects: string[],
    availableTime: string,
    startDate: string,
    endDate: string
}) => {
    const result = await prisma.tutionInfo.update({
        where: {
            id
        },
        data: {
            availability,
            salary,
            subjects,
            availableTime,
            startDate,
            endDate
        }
    });
    return {
        success: true,
        data: result
    }
}

// * Create Qualifications
const createQualification = async (data: {
    tutorId: string,
    exam: string,
    year: string,
    gpa: string,
    group: string,
    institute: string
}) => {
    const result = await prisma.qualification.create({
        data
    })
    return {
        success: true,
        data: result
    }
}
// * Update Qualifications
const updateQualification = async ({
    id,
    exam,
    year,
    gpa,
    group,
    institute
}: {
    id: string,
    exam: string,
    year: string,
    gpa: string,
    group: string,
    institute: string
}) => {
    const result = await prisma.qualification.update({
        where: {
            id
        },
        data: {
            exam,
            year,
            gpa,
            group,
            institute
        }
    })
    return {
        success: true,
        data: result
    }
}
// * Delete Qualifications 
const deleteQualification = async (id: string) => {
    const result = await prisma.qualification.delete({
        where: {
            id
        }
    })
    console.log(result);
    return {
        success: true,
        data: result
    }
}
// * Create Category 
const createCategory = async ({ tutorId, category }: { tutorId: string, category: string }) => {
    const result = await prisma.categories.create({
        data: {
            tutorId,
            category,
        }
    })
    return {
        success: true,
        data: result
    }
}
// * Delete Category 
const deleteCategory = async (id: string) => {
    const result = await prisma.categories.delete({
        where: {
            id
        }
    })
    console.log(result);
    return {
        success: true,
        data: result
    }
}

export const tutorServices = {
    createTutionInfo,
    updateTutionInfo,
    createQualification,
    updateQualification,
    deleteQualification,
    createCategory,
    deleteCategory
}