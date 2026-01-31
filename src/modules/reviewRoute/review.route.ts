import { Router } from "express";
import authorize, { UserRole } from "../../middleware/authorize";
import { reviewControler } from "./review.controler";

const router = Router();

// * Get Review by user Id
router.get(
    "/user",
    authorize(UserRole.STUDENT, UserRole.TUTOR),
    reviewControler.getReviewByUserId
)
// * Create Review
router.post(
    "/user",
    authorize(UserRole.STUDENT),
    reviewControler.createReview
)

// * Get all Review
router.get(
    "/",
    reviewControler.getReview
)

export const reviewRoutes = router