import { GENDER } from "../../prisma/generated/prisma/enums";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/authorize";


async function seedAdmin() {
    try {
        const adminData = {
            name: process.env.ADMIN_NAME as string,
            email: process.env.ADMIN_EMAIL as string,
            role: UserRole.ADMIN,
            password: process.env.ADMIN_PASS as string,
            gender: GENDER.Male
        }
        // * check user exist on db or not
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });

        if (existingUser) {
            throw new Error("User already exists!!");
        }

        const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Origin": "http://localhost:5000"
            },
            body: JSON.stringify(adminData)
        })
        console.log(signUpAdmin);

    } catch (error) {
        console.error(error);
    }
}

seedAdmin()