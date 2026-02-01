import { NextFunction, Request, Response } from "express";
import { statsServices } from "./stats.services";
import { UserRole } from "../../middleware/authorize";

// * get admin stats
const getAdminStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await statsServices.getAdminStats();
        return res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}
// * Get user stats
const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.user?.id as string
        const isTutor = req.user?.role === UserRole.TUTOR
        const result = await statsServices.getUserStats(id, isTutor);
        return res.status(200).json(result)
    } catch (error: any) {
        next(error)
    }
}
export const statsControler = {
    getAdminStats,
    getUserStats
}