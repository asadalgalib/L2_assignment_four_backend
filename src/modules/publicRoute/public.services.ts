import { UserWhereInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma";

// * Get Tutor
const getTutor = async ({
    search,
    category,
    available,
    page,
    limit,
    skip,
    sortBy,
    sortOrder
}: {
    search: string | undefined;
    category: string | undefined;
    available: string | undefined;
    page: number;
    limit: number;
    skip: number | string;
    sortBy: string;
    sortOrder: string;
}) => {

    const andConditions: UserWhereInput[] = [];
    // search, category, availability, maxSalary,minSalary, Group, institute , page,skip, limit, sortBy,sortOrder
    if (search) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: search as string,
                        mode: "insensitive",
                    },
                },
                {
                    tutionInfo: {
                        is: {
                            subjects: {
                                has: search as string,
                            },
                        },
                    },
                },
                {
                    tutorCategories: {
                        some: {
                            category: {
                                category: {
                                    contains: search as string,
                                    mode: "insensitive"
                                }
                            }
                        },
                    },
                },
                {
                    qualifications: {
                        some: {
                            institute: {
                                contains: search as string,
                                mode: "insensitive"
                            }
                        }
                    }
                },
            ],
        })
    }
    if (category) {
        andConditions.push({
            OR: [
                {
                    tutorCategories: {
                        some: {
                            category: {
                                category: {
                                    contains: category as string,
                                    mode: "insensitive"
                                }
                            }
                        }
                    }
                }
            ]
        })
    }
    if (available === "true") {
        andConditions.push({
            OR: [
                {
                    tutionInfo: {
                        is: {
                            availability: true
                        }
                    }
                }
            ]
        })
    }
    if (available === "false") {
        andConditions.push({
            OR: [
                {
                    tutionInfo: {
                        is: {
                            availability: false
                        }
                    }
                }
            ]
        })
    }
    const result = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
            role: "TUTOR",
            status: "ACTIVE",
            AND: andConditions
        },
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            tutionInfo: true,
            tutorCategories: {
                select: {
                    category: true
                }
            },
            qualifications: true
        },
    });

    const totalData = await prisma.user.count({
        where: {
            role: "TUTOR",
            status: "ACTIVE",
            AND: andConditions
        },
    })
    const totalPage = Math.ceil(totalData / limit);

    return {
        success: true,
        data: result,
        pagination: {
            totalData,
            page,
            limit,
            totalPage
        }
    }
}

// * Get Tutor by ID
const getTutorById = async (id: string) => {

    const result = await prisma.user.findMany({
        where: {
            id: id,
            role: "TUTOR",
            status: "ACTIVE",
        },
        include: {
            tutionInfo: true,
            tutorCategories: true,
            qualifications: true
        },
    });

    return {
        success: true,
        data: result
    }
}
// * Get Categories
const getCategories = async () => {
    const result = await prisma.categories.findMany({
        distinct: ["category"],
        orderBy: {
            category: "asc"
        }
    });
    return {
        success: true,
        data: result
    }
}

export const publicServices = {
    getTutor,
    getTutorById,
    getCategories
}