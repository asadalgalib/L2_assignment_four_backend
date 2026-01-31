import { Request, Response } from "express";
import { statsServices } from "./stats.services";
import { UserRole } from "../../middleware/authorize";

// * get admin stats
const getAdminStats = async (req: Request, res: Response) => {
    try {
        const result = await statsServices.getAdminStats();
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}
// * Get user stats
const getUserStats = async (req: Request, res: Response) => {
    try {
        const id = req.user?.id as string
        const isTutor = req.user?.role === UserRole.TUTOR
        const result = await statsServices.getUserStats(id, isTutor);
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}
export const statsControler = {
    getAdminStats,
    getUserStats
}