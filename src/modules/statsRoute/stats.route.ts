import { Router } from "express";
import authorize, { UserRole } from "../../middleware/authorize";
import { statsControler } from "./stats.controler";

const router = Router();

// * Admin Stats
router.get(
    "/admin",
    authorize(UserRole.ADMIN),
    statsControler.getAdminStats
)
// * User Stats
router.get(
    "/user",
    authorize(UserRole.TUTOR, UserRole.STUDENT),
    statsControler.getUserStats
)

export const statsRoutes = router