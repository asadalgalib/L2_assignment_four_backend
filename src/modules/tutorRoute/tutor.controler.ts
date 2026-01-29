import { Request, Response } from "express";
import { tutorServices } from "./tutor.services";

// * Create Tutor Profile
const createTutorProfile = async (req: Request, res: Response) => {
    try {
        const { gender } = req.body;
        const tutorId = req.user?.id;
        const result = await tutorServices.createTutorProfile(gender, tutorId as string);
        return res.status(201).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}

export const tutorControler = {
    createTutorProfile
}