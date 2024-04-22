import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      channelIDs: [],
    },
  })
  return user
}

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return user
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return user
}

export async function updateUser(id: string, data: {  }) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  })
  return user
}

export async function createMessage(
  authorId: string,
  channelId: string,
  content: string,
) {
  const message = await prisma.message.create({
    data: {
      authorId,
      channelId,
      content,
    },
  })
  return message
}

export async function getMessagesByChannel(channelId: string) {
  const messages = await prisma.message.findMany({
    where: {
      channelId,
    },
  })
  return messages
}

export async function getMessagesByUser(authorId: string) {
  const messages = await prisma.message.findMany({
    where: {
      authorId,
    },
  })
  return messages
}

export async function getMessagesByUserAndChannel(
  authorId: string,
  channelId: string,
) {
  const messages = await prisma.message.findMany({
    where: {
      authorId,
      channelId,
    },
  })
  return messages
}

export async function createChannel() {
  const channel = await prisma.channel.create({
    data: {
      userIDs: [],
      messageIDs: [],
    },
  })
  return channel
}

export async function getChannel(id: string) {
  const channel = await prisma.channel.findUnique({
    where: {
      id,
    },
  })
  return channel
}