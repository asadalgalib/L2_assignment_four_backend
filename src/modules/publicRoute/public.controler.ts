import { Request, Response } from "express";
import { publicServices } from "./public.services";

// * Get Tutor
const getTutor = async (req: Request, res: Response) => {
    try {
        const result = await publicServices.getTutor();
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}

// * Get Tutor by Id
const getTutorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await publicServices.getTutorById(id as string);
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}

export const publicControler = {
    getTutor,
    getTutorById
}