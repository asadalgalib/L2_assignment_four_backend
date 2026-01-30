import { User, UserStatus } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma"

// * Get all user
const getUser = async () => {
    console.log("get all");
    const result = await prisma.user.findMany()
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