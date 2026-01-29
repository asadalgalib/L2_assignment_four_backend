import { Router } from "express";
import authorize, { UserRole } from "../../middleware/authorize";
import { publicControler } from "./public.controler";

const router = Router();

// * Get tutors
router.get(
    "/",
    publicControler.getTutor
)
// * Get tutors by id
router.get(
    "/:id",
    publicControler.getTutorById
)

export const publicRoutes = router;