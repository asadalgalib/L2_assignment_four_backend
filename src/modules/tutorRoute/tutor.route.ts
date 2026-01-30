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

// * Update Tution Info
router.patch(
    "/tutioninfo/:id",
    authorize(UserRole.TUTOR),
    tutorControler.updateTutionInfo
)

// * Create Qualification
router.post(
    "/qualification",
    authorize(UserRole.TUTOR),
    tutorControler.createQualification
);

// * Update Qualification
router.patch(
    "/qualification/:id",
    authorize(UserRole.TUTOR),
    tutorControler.updateQualification
);

// * Delete Qualification
router.delete(
    "/qualification/:id",
    authorize(UserRole.TUTOR),
    tutorControler.deleteQualification
);

// * Create Category
router.post(
    "/category",
    authorize(UserRole.TUTOR),
    tutorControler.createCategory
);

// * Delete Category
router.delete(
    "/category/:id",
    authorize(UserRole.TUTOR),
    tutorControler.deleteCategory
);

export const tutorRoutes = router;