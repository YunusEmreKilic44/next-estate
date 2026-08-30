import { prisma } from "@/lib/db";
import { getCurrentUser } from "./getCurrentUser";

export const getUserProperties = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return [];
    }

    const properties = await prisma.property.findMany({
      where: {
        ownerId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return properties;
  } catch (error) {
    console.error("Failed to fetch properties", error);
    return [];
  }
};
