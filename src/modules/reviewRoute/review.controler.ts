import { NextFunction, Request, Response } from "express";
import { reviewServices } from "./review.services";
import { UserRole } from "../../middleware/authorize";

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId = req.user?.id as string
        const { tutorId, bookingId, rating, text } = req.body
        const result = await reviewServices.createReview({ tutorId, bookingId, studentId, rating, text });
        return res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

// * Get Review by user Id
const getReviewByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?.id as string
        const isTutor = req.user?.role === UserRole.TUTOR
        const result = await reviewServices.getReviewByUserId(id, isTutor);
        return res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}
// * Get all review 
const getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await reviewServices.getReview();
        return res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

export const reviewControler = {
    createReview,
    getReviewByUserId,
    getReview
}