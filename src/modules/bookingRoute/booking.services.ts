import { Request } from "express";
import { prisma } from "../../lib/prisma";

// * Create Booking
const createBooking = async ({
    tutorId,
    studentId,
    start_date,
    end_date
}: {
    tutorId: string;
    studentId: string;
    start_date: string,
    end_date: string;
}) => {
    const tutionInfo = await prisma.tutionInfo.findUnique({
        where: {
            tutorId: tutorId
        }
    });
    if (!tutionInfo?.availability) {
        return {
            message: "Tutor is not available at this moment"
        }
    }
    // * Get Total Day & Total Price
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const diffTime = endDate.getTime() - startDate.getTime();
    const totalDay = diffTime / (1000 * 60 * 60 * 24);
    const total_price = (Number(tutionInfo?.salary) * Number(totalDay));
    const result = await prisma.booking.create({
        data: {
            tutorId, studentId, start_date, end_date, total_price
        }
    });

    return {
        success: true,
        data: result
    }
}

// * Get Bookings
const getAllBookings = async (req: Request) => {
    const user = req.user;

    if (!user) throw Error("You are not authorized");
    let result;
    if (user.role === "ADMIN") {
        result = await prisma.booking.findMany();
    }
    if (user.role === "TUTOR") {
        result = await prisma.booking.findMany({
            where: {
                tutorId: user.id
            }
        })
    }
    if (user.role === "STUDENT") {
        result = await prisma.booking.findMany({
            where: {
                studentId: user.id
            }
        })
    }
    return {
        success: true,
        data: result
    };
}
// * Get Booking by id 
const getBookingById = async (id: string) => {
    const result = await prisma.booking.findUnique({
        where: {
            id: id
        }
    });
    return {
        success: true,
        data: result
    }
}

// * Update Booking
const updateBooking = async (req: Request) => {
    const user = req.user;
    const { id } = req.params;
    if (!user) throw Error("You are not authorized");
    let result;

    if (user.role === "TUTOR") {
        result = await prisma.booking.update({
            where: {
                id: id as string
            },
            data: {
                status: "COMPLETED"
            }
        });
    }
    if (user.role === "STUDENT") {
        result = await prisma.booking.update({
            where: {
                id: id as string
            },
            data: {
                status: "CANCELED"
            }
        })
    }
    return {
        success: true,
        data: result
    }
}

export const bookingServices = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking
}