import { Router } from "express";
import { publicControler } from "./public.controler";

const router = Router();

// * Get tutors
router.get(
    "/tutors",
    publicControler.getTutor
)
// * Get tutors by id
router.get(
    "/tutors/:id",
    publicControler.getTutorById
)
router.get(
    "/categories",
    publicControler.getCategories
)

export const publicRoutes = router;