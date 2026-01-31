import { User, UserStatus } from "../../../prisma/generated/prisma/client";
import { UserWhereInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware/authorize";

// * Get all user
const getUser = async ({
    isActive,
    isFeatured,
    isTutor,
    isStudent
}: {
    isActive: string | undefined;
    isFeatured: string | undefined;
    isTutor: string | undefined;
    isStudent: string | undefined
}) => {
    console.log("get all");
    const andConditions: UserWhereInput[] = [];
    console.log(isActive);

    if (isActive === "true") {
        andConditions.push({
            OR: [
                {
                    status: UserStatus.ACTIVE
                }
            ]
        })
    }
    if (isActive === "false") {
        andConditions.push({
            OR: [
                {
                    status: UserStatus.DEACTIVE
                }
            ]
        })
    }
    if (isFeatured === "true") {
        andConditions.push({
            OR: [
                {
                    isFeatured: true
                }
            ]
        })
    }
    if (isTutor === "true") {
        andConditions.push({
            OR: [
                {
                    role: UserRole.TUTOR
                }
            ]
        })
    }
    if (isStudent === "true") {
        andConditions.push({
            OR: [
                {
                    role: UserRole.STUDENT
                }
            ]
        })
    }

    const result = await prisma.user.findMany({
        where: {
            AND: andConditions
        },
        orderBy: {
            role: "desc"
        }
    })

    return {
        success: true,
        data: result
    }
}

// * Update User 
const updateUser = async (id: string, status: UserStatus, isFeatured: boolean) => {

    const result = await prisma.user.update({
        where: {
            id
        },
        data: {
            status,
            isFeatured
        }
    })
    return {
        success: true,
        data: result
    }
}

// * Get current user
const getCurrentUser = async (id: string) => {
    console.log("get current");
    const result = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return {
        success: true,
        data: result
    }
}
// * Update current user
const updateCurrentUser = async (id: string, isAdmin: boolean, data: Partial<User>) => {

    if (!isAdmin) {
        delete data.isFeatured
        delete data.role
        delete data.status
    }

    const result = await prisma.user.update({
        where: {
            id
        },
        data
    })
    return {
        success: true,
        data: result
    }
}

export const userServices = {
    getUser,
    updateUser,
    getCurrentUser,
    updateCurrentUser
}