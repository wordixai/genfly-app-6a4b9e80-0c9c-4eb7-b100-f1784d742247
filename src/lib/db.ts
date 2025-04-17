import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Helper functions for database operations

// Listings
export async function getListingsByCategory(category: string, filters: any = {}) {
  return prisma.listing.findMany({
    where: {
      category: category.toUpperCase() as any,
      ...filters,
    },
    include: {
      user: true,
      reviews: true,
      coordinates: true,
    },
  });
}

export async function getListingById(id: string) {
  return prisma.listing.findUnique({
    where: { id },
    include: {
      user: true,
      reviews: {
        include: {
          user: true,
        },
      },
      coordinates: true,
    },
  });
}

// Users
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function getUserListings(userId: string) {
  return prisma.listing.findMany({
    where: {
      userId,
    },
    include: {
      reviews: true,
    },
  });
}

export async function getUserFavorites(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      favorites: {
        include: {
          reviews: true,
        },
      },
    },
  });
}

// Bookings
export async function createBooking(data: any) {
  return prisma.booking.create({
    data,
    include: {
      listing: true,
      user: true,
    },
  });
}

export async function getUserBookings(userId: string) {
  return prisma.booking.findMany({
    where: {
      userId,
    },
    include: {
      listing: true,
    },
  });
}

// Messages
export async function getUserConversations(userId: string) {
  // Get unique conversations
  const sentMessages = await prisma.message.findMany({
    where: {
      senderId: userId,
    },
    distinct: ['receiverId'],
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      receiver: true,
    },
  });

  const receivedMessages = await prisma.message.findMany({
    where: {
      receiverId: userId,
    },
    distinct: ['senderId'],
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      sender: true,
    },
  });

  // Combine and deduplicate
  const conversations = new Map();
  
  sentMessages.forEach(message => {
    conversations.set(message.receiverId, {
      user: message.receiver,
      lastMessage: message,
    });
  });
  
  receivedMessages.forEach(message => {
    if (!conversations.has(message.senderId) || 
        message.createdAt > conversations.get(message.senderId).lastMessage.createdAt) {
      conversations.set(message.senderId, {
        user: message.sender,
        lastMessage: message,
      });
    }
  });
  
  return Array.from(conversations.values());
}