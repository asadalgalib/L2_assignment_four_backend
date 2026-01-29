import { Request, Response } from "express";
import { tutorServices } from "./tutor.services";

// * Create Tutor Profile
const createTutorProfile = async (req: Request, res: Response) => {
    try {
        const { gender } = req.body;
        const tutorId = req.user?.id as string;
        const result = await tutorServices.createTutorProfile(gender, tutorId);
        return res.status(201).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}
// * Create Tution Info
const createTutionInfo = async (req: Request, res: Response) => {
    try {
        const tutorId = req.user?.id as string
        const { availability, salary, subjects, availableTime, startDate, endDate } = req.body;
        const result = await tutorServices.createTutionInfo({
            tutorId, availability, salary, subjects, availableTime, startDate, endDate
        });
        return res.status(201).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}

export const tutorControler = {
    createTutorProfile,
    createTutionInfo
}