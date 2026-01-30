import { Request, Response } from "express";
import { bookingServices } from "./booking.services";

// * Create booking
const createBooking = async (req: Request, res: Response) => {
    try {
        const studentId = req.user?.id as string
        const { tutorId, start_date, end_date } = req.body;
        const result = await bookingServices.createBooking({ tutorId, studentId, start_date, end_date });
        return res.status(201).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}

// * Get Bookings
const getAllBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingServices.getAllBookings(req);
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}
// * Get Booking by id 
const getBookingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const result = await bookingServices.getBookingById(id as string);
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}

// * Update Booking
const updateBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingServices.updateBooking(req);
        return res.status(201).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}
export const bookingControler = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking
}