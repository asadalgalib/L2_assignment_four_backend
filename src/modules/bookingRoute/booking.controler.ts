import { NextFunction, Request, Response } from "express";
import { bookingServices } from "./booking.services";

// * Create booking
const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user?.id as string
        const { tutorId, start_date, end_date } = req.body;
        const result = await bookingServices.createBooking({ tutorId, studentId, start_date, end_date });
        return res.status(201).json(result)
    } catch (error: any) {
        next(error);
    }
}

// * Get Bookings
const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await bookingServices.getAllBookings(req);
        return res.status(200).json(result)
    } catch (error: any) {
        next(error);
    }
}
// * Get Booking by id 
const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await bookingServices.getBookingById(id as string);
        return res.status(200).json(result)
    } catch (error: any) {
        next(error);
    }
}

// * Update Booking
const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await bookingServices.updateBooking(req);
        return res.status(201).json(result)
    } catch (error: any) {
        next(error);
    }
}
export const bookingControler = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking
}