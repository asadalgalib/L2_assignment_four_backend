import { BOOKING, UserStatus } from "../../../prisma/generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware/authorize"

const getAdminStats = async () => {
    // * Active User
    const activeUsers = await prisma.user.count({
        where: {
            status: UserStatus.ACTIVE
        }
    })
    // * Deactive user
    const deactiveUsers = await prisma.user.count({
        where: {
            status: UserStatus.DEACTIVE
        }
    })
    // * Featured Tutor
    const featuredTutor = await prisma.user.count({
        where: {
            isFeatured: true
        }
    })
    // * Student Count
    const studentCount = await prisma.user.count({
        where: {
            role: UserRole.STUDENT
        }
    })
    // * Tutor Count
    const tutorCount = await prisma.user.count({
        where: {
            role: UserRole.TUTOR
        }
    })
    // * Booking Count 
    const bookingCount = await prisma.booking.count();
    // * Review Count 
    const reviewCount = await prisma.reviews.count();

    return {
        sucess: true,
        data: {
            activeUsers,
            deactiveUsers,
            featuredTutor,
            tutorCount,
            studentCount,
            bookingCount,
            reviewCount
        }
    }
}

// * Get User stats
const getUserStats = async (id: string, isTutor: boolean) => {
    let bookingCount;
    let reviewCount;
    let completedBookingCount;
    let canceledBookingCount;
    let ongoingBookingCount;
    let totalPrice;
    // * if tutor then 
    if (isTutor) {
        // * Total booking count
        bookingCount = await prisma.booking.count({
            where: {
                tutorId: id
            }
        })
        // * Completed booking count
        completedBookingCount = await prisma.booking.count({
            where: {
                tutorId: id,
                status: BOOKING.COMPLETED
            }
        })
        // * canceled booking count
        canceledBookingCount = await prisma.booking.count({
            where: {
                tutorId: id,
                status: BOOKING.CANCELED
            }
        })
        // * Ongoing booking count
        ongoingBookingCount = await prisma.booking.count({
            where: {
                tutorId: id,
                status: BOOKING.CONFIRMED
            }
        })
        // * total review count
        reviewCount = await prisma.reviews.count({
            where: {
                tutorId: id
            }
        })
        // * total revenue
        totalPrice = await prisma.booking.aggregate({
            where: {
                tutorId: id
            },
            _sum: {
                total_price: true
            }
        })
    }
    // * if student
    if (!isTutor) {
        // * Total booking count
        bookingCount = await prisma.booking.count({
            where: {
                studentId: id
            }
        })
        // * Completed booking count
        completedBookingCount = await prisma.booking.count({
            where: {
                studentId: id,
                status: BOOKING.COMPLETED
            }
        })
        // * canceled booking count
        canceledBookingCount = await prisma.booking.count({
            where: {
                studentId: id,
                status: BOOKING.CANCELED
            }
        })
        // * Ongoing booking count
        ongoingBookingCount = await prisma.booking.count({
            where: {
                studentId: id,
                status: BOOKING.CONFIRMED
            }
        })
        // * total review count
        reviewCount = await prisma.reviews.count({
            where: {
                studentId: id,
            }
        }),
            // * total revenue
            totalPrice = await prisma.booking.aggregate({
                where: {
                    studentId: id,
                },
                _sum: {
                    total_price: true
                }
            })
    }
    const totalRevenue = totalPrice?._sum.total_price ?? 0;
    return {
        success: true,
        data: {
            bookingCount,
            completedBookingCount,
            canceledBookingCount,
            ongoingBookingCount,
            reviewCount,
            totalRevenue
        }
    }

}
export const statsServices = {
    getAdminStats,
    getUserStats
}