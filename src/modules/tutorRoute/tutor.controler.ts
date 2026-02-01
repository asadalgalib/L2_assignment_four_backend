import { NextFunction, Request, Response } from "express";
import { tutorServices } from "./tutor.services";

// * Create Tution Info
const createTutionInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tutorId = req.user?.id as string
        const { availability, salary, subjects, availableTime, startDate, endDate } = req.body;
        const result = await tutorServices.createTutionInfo({
            tutorId, availability, salary, subjects, availableTime, startDate, endDate
        });
        return res.status(201).json(result)
    } catch (error: any) {
        next(error)
    }
}
// * Update Tution Info
const updateTutionInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string
        const { availability, salary, subjects, availableTime, startDate, endDate } = req.body;
        const result = await tutorServices.updateTutionInfo({ id, availability, salary, subjects, availableTime, startDate, endDate })
        return res.status(201).json(result)
    } catch (error: any) {
        next(error)
    }
}
// * Create Qualifications
const createQualification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tutorId = req.user?.id as string;
        const { exam, year, gpa, group, institute } = req.body;
        const result = await tutorServices.createQualification({ tutorId, exam, year, gpa, group, institute });
        return res.status(201).json(result)
    } catch (error: any) {
        next(error)
    }
}
// * Update Qualifications
const updateQualification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const { exam, year, gpa, group, institute } = req.body;
        const result = await tutorServices.updateQualification({ id, exam, year, gpa, group, institute });
        return res.status(201).json(result)
    } catch (error: any) {
        next(error)
    }
}
// * Delete Qualifications 
const deleteQualification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params?.id as string;
        const result = await tutorServices.deleteQualification(id);
        return res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}
// * Add Category
const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tutorId = req.user?.id as string;
        const { categoryId } = req.body
        const result = await tutorServices.addCategory({ tutorId, categoryId });
        return res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}
// * Delete Category
const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tutorId = req.user?.id as string;
        const categoryId = req.params?.id as string;
        const result = await tutorServices.deleteCategory({ tutorId, categoryId });
        return res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

export const tutorControler = {
    createTutionInfo,
    updateTutionInfo,
    createQualification,
    updateQualification,
    deleteQualification,
    addCategory,
    deleteCategory
}