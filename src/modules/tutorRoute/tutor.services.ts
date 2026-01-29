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

export const tutorServices = {
    createTutorProfile
}