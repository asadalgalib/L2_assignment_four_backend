import { Router } from "express";
import authorize, { UserRole } from "../../middleware/authorize";
import { userControler } from "./user.controler";

const router = Router();

// * Get Current User 
router.get(
    "/me",
    authorize(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN),
    userControler.getCurrentUser
)

// * Update current User
router.patch(
    "/me",
    authorize(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN),
    userControler.currentUserUpdate
)

// * Get all user
router.get(
    "/",
    authorize(UserRole.ADMIN),
    userControler.getUser
)

// * Update User
router.patch(
    "/:id",
    authorize(UserRole.ADMIN),
    userControler.updateUser
)


export const userRoutes = router;