import { Router } from "express";
import authorize, { UserRole } from "../../middleware/authorize";
import { tutorControler } from "./tutor.controler";

const router = Router();

// * Create Tutor Profile
router.post(
    "/profile",
    authorize(UserRole.TUTOR),
    tutorControler.createTutorProfile
)
// * Create Tution Info
router.post(
    "/tutioninfo",
    authorize(UserRole.TUTOR),
    tutorControler.createTutionInfo
);


export const tutorRoutes = router;