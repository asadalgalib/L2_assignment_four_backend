import { Router } from "express";
import authorize, { UserRole } from "../../middleware/authorize";
import { tutorControler } from "./tutor.controler";

const router = Router();

// * Create Tution Info
router.post(
    "/tutioninfo",
    authorize(UserRole.TUTOR),
    tutorControler.createTutionInfo
);
// * Create Qualification
router.post(
    "/qualification",
    authorize(UserRole.TUTOR),
    tutorControler.createQualification
);
// * Create Category
router.post(
    "/category",
    authorize(UserRole.TUTOR),
    tutorControler.createCategry
);

export const tutorRoutes = router;