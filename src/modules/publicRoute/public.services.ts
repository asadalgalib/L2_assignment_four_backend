import { prisma } from "../../lib/prisma";

// * Get Tutor
const getTutor = async () => {

    const result = await prisma.user.findMany({
        where: {
            role: "TUTOR"
        }
    });

    return {
        data: result
    }
}

// * Get Tutor by ID
const getTutorById = async (id: string) => {

    const result = await prisma.user.findMany({
        where: {
            id: id,
            role: "TUTOR"

        }
    });

    return {
        data: result
    }
}

export const publicServices = {
    getTutor,
    getTutorById
}