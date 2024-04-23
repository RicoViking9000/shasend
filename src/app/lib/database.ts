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
  authorID: string,
  channelID: string,
  content: string,
) {
  const message = await prisma.message.create({
    data: {
      authorID,
      channelID,
      content,
    },
  })
  return message
}

export async function createMessageAndAddToChannel(
  authorID: string,
  channelID: string,
  content: string,
) {
  const message = await createMessage(authorID, channelID, content)
  const channel = await prisma.channel.update({
    where: {
      id: channelID,
    },
    data: {
      messageIDs: {
        push: message.id,
      },
    },
  })
  return message
}

export async function getMessagesByChannel(channelID: string) {
  const messages = await prisma.message.findMany({
    where: {
      channelID,
    },
  })
  return messages
}

export async function getMostRecentMessageByChannel(channelID: string) {
  const message = await prisma.message.findFirst({
    where: {
      channelID,
    },
    orderBy: {
      timestamp: 'desc',
    },
  })
  return message
}

export async function getMessagesByUser(authorID: string) {
  const messages = await prisma.message.findMany({
    where: {
      authorID,
    },
  })
  return messages
}

export async function getMessagesByUserAndChannel(
  authorID: string,
  channelID: string,
) {
  const messages = await prisma.message.findMany({
    where: {
      authorID,
      channelID,
    },
  })
  return messages
}

export async function createChannel(userIDs: string[]) {
  const channel = await prisma.channel.create({
    data: {
      userIDs: userIDs,
      messageIDs: [],
    },
  })
  return channel
}

export async function addUsersToChannel(channelID: string, userIDs: string[]) {
  const channel = await prisma.channel.update({
    where: {
      id: channelID,
    },
    data: {
      userIDs: {
        push: userIDs,
      },
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

export async function getChannelsByUser(userID: string) {
  const channels = await prisma.channel.findMany({
    where: {
      userIDs: {
        has: userID,
      },
    },
  })
  return channels
}