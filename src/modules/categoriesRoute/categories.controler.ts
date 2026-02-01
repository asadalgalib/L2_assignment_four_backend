import { NextFunction, Request, Response } from "express";
import { categoryServices } from "./categories.services";

// * Create Category 
const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category } = req.body;
        const result = await categoryServices.createCategory(category);
        return res.status(201).json(result)
    } catch (error: any) {
        next(error)
    }
}

// * Delete Category 
const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params?.id as string;
        const result = await categoryServices.deleteCategory(id);
        return res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}

export const categoryControler = {
    createCategory,
    deleteCategory
}