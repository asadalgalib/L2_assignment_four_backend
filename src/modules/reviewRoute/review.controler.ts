import { Request, Response } from "express";
import { reviewServices } from "./review.services";
import { UserRole } from "../../middleware/authorize";

const createReview = async (req: Request, res: Response) => {
    try {
        const studentId = req.user?.id as string
        const { tutorId, bookingId, rating, text } = req.body
        const result = await reviewServices.createReview({ tutorId, bookingId, studentId, rating, text });
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}

// * Get Review by user Id
const getReviewByUserId = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id as string
        const isTutor = req.user?.role === UserRole.TUTOR
        const result = await reviewServices.getReviewByUserId(id, isTutor);
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}
// * Get all review 
const getReview = async (req: Request, res: Response) => {
    try {
        const result = await reviewServices.getReview();
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}

export const reviewControler = {
    createReview,
    getReviewByUserId,
    getReview
}