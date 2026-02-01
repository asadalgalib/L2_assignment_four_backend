import { prisma } from "../../lib/prisma"

// * Create Category 
const createCategory = async (category: string) => {
    const result = await prisma.categories.create({
        data: {
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
    return {
        success: true,
        data: result
    }
}

export const categoryServices = {
    createCategory,
    deleteCategory
}