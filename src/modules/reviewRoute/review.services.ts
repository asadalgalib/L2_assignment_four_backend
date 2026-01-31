import { prisma } from "../../lib/prisma"

// * Create Review
const createReview = async ({
    tutorId,
    bookingId,
    studentId,
    rating,
    text
}: {
    tutorId: string,
    bookingId: string,
    studentId: string,
    rating: number,
    text: string
}) => {
    const result = await prisma.reviews.create({
        data: {
            tutorId,
            studentId,
            bookingId,
            rating,
            text
        }
    })

    return {
        success: true,
        data: result
    }
}

// * Get Review by user Id
const getReviewByUserId = async (id: string, isTutor: boolean) => {
    let result;

    if (isTutor) {
        result = await prisma.reviews.findMany({
            where: {
                tutorId: id
            }
        })
    }
    if (!isTutor) {
        result = await prisma.reviews.findMany({
            where: {
                studentId: id
            }
        })
    }

    return {
        success: true,
        data: result
    }
}

// * Get all review 
const getReview = async () => {
    const result = await prisma.reviews.findMany({
        take: 10,
        orderBy: {
            rating: "desc"
        },
        select: {
            rating: true,
            text: true
        }
    })
    return {
        success: true,
        data: result
    }
}

export const reviewServices = {
    createReview,
    getReviewByUserId,
    getReview
}