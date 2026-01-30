import { Router } from "express";
import authorize, { UserRole } from "../../middleware/authorize";
import { bookingControler } from "./booking.controler";

const router = Router();

// * Create Booking
router.post(
    "/",
    authorize(UserRole.STUDENT),
    bookingControler.createBooking
);

// * Get Bookings
router.get(
    "/",
    authorize(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN),
    bookingControler.getAllBookings
)

// * Get Booking by Id
router.get(
    "/:id",
    authorize(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN),
    bookingControler.getBookingById
)

// * Update Booking
router.patch(
    "/:id",
    authorize(UserRole.STUDENT, UserRole.TUTOR),
    bookingControler.updateBooking
)

export const bookingRoutes = router;