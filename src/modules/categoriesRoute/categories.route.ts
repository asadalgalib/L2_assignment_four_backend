import { Router } from "express";
import authorize, { UserRole } from "../../middleware/authorize";
import { categoryControler } from "./categories.controler";

const router = Router();

// * Create Category
router.post(
    "/",
    authorize(UserRole.ADMIN),
    categoryControler.createCategory
);

// * Delete Category
router.delete(
    "/:id",
    authorize(UserRole.ADMIN),
    categoryControler.deleteCategory
);

export const categoryRoutes = router;