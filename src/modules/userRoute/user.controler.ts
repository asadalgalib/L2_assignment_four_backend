import { Request, Response } from "express";
import { userServices } from "./user.services";
import { UserRole } from "../../middleware/authorize";

// * Get user
const getUser = async (req: Request, res: Response) => {
    try {
        console.log("get all");
        const result = await userServices.getUser();
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}
// * Update User
const updateUser = async (req: Request, res: Response) => {
    try {
        console.log("update user from 21");
        const id = req.params?.id as string
        const { status, isFeatured } = req.body
        const result = await userServices.updateUser(id, status, isFeatured);
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}

// * Get current User
const getCurrentUser = async (req: Request, res: Response) => {
    try {
        console.log("get current");
        const id = req.user?.id as string
        const result = await userServices.getCurrentUser(id);
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}
// * Update current user
const currentUserUpdate = async (req: Request, res: Response) => {
    try {
        console.log("update current user");
        const id = req.user?.id as string
        const isAdmin = req.user?.role === UserRole.ADMIN
        console.log(id, isAdmin);
        const result = await userServices.updateCurrentUser(id, isAdmin, req.body);
        return res.status(200).json(result)
    } catch (error: any) {
        return res.status(400).json({
            message: "Something went wrong",
            error: error
        })
    }
}

export const userControler = {
    getUser,
    updateUser,
    getCurrentUser,
    currentUserUpdate
}