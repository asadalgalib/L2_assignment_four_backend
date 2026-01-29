import { Request, Response } from "express";
import { publicServices } from "./public.services";
import paginationSortingHelper from "../../helper/paginationSortingHelper";

// * Get Tutor
const getTutor = async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string | undefined;
        const category = req.query.category as string | undefined;
        const available = req.query.available as string | undefined;
        const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(req.query);
        console.log({
            search, category, available, page, limit, skip, sortBy, sortOrder
        });
        const result = await publicServices.getTutor({
            search, category, available, page, limit, skip, sortBy, sortOrder
        });
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