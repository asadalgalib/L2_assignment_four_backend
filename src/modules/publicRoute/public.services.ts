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
                    tutorProfiles: {
                        is: {
                            tutionInfo: {
                                is: {
                                    subjects: {
                                        has: search as string,
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    tutorProfiles: {
                        is: {
                            categories: {
                                some: {
                                    category: {
                                        contains: search as string,
                                        mode: "insensitive",
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    tutorProfiles: {
                        is: {
                            qualification: {
                                some: {
                                    institute: {
                                        contains: search as string,
                                        mode: "insensitive",
                                    },
                                },
                            },
                        },
                    },
                },
            ],
        })
    }

    if (category) {
        andConditions.push({
            OR: [
                {
                    tutorProfiles: {
                        is: {
                            categories: {
                                some: {
                                    category: {
                                        contains: category as string,
                                        mode: "insensitive"
                                    }
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
                    tutorProfiles: {
                        is: {
                            tutionInfo: {
                                is: {
                                    availability: true
                                }
                            }
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
                    tutorProfiles: {
                        is: {
                            tutionInfo: {
                                is: {
                                    availability: false
                                }
                            }
                        }
                    }
                }
            ]
        })
    }

    if (typeof search === "undefined" && typeof category === "undefined" && typeof available === "undefined") {
        andConditions.push({
            OR: [
                {
                    tutorProfiles: {
                        isNot: null
                    },

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
            tutorProfiles: {
                include: {
                    tutionInfo: true,
                    categories: {
                        select: {
                            category: true
                        }
                    },
                    qualification: true,
                    reviews: {
                        select: {
                            rating: true,
                            text: true
                        }
                    }
                }
            }

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
            tutorProfiles: {
                isNot: null
            }
        },
        include: {
            tutorProfiles: {
                include: {
                    tutionInfo: true,
                    categories: {
                        select: {
                            category: true
                        }
                    },
                    qualification: true,
                    reviews: {
                        select: {
                            rating: true,
                            text: true
                        }
                    }
                }
            }

        },
    });

    return {
        success: true,
        data: result
    }
}

export const publicServices = {
    getTutor,
    getTutorById
}