'use server'

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

export async function getUser(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return user
}

export async function updateUser(id: number, data: {  }) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  })
  return user
}

export async function createMessage(
  userID: number,
  channelID: number,
  content: string,
) {
  const message = await prisma.message.create({
    data: {
      userID,
      channelID,
      content,
    },
  })
  return message
}

export async function getMessagesByChannel(channelID: number) {
  const messages = await prisma.message.findMany({
    where: {
      channelID,
    },
  })
  return messages
}

export async function getMessagesByUser(userID: number) {
  const messages = await prisma.message.findMany({
    where: {
      userID,
    },
  })
  return messages
}

export async function getMessagesByUserAndChannel(
  userID: number,
  channelID: number,
) {
  const messages = await prisma.message.findMany({
    where: {
      userID,
      channelID,
    },
  })
  return messages
}

export async function createChannel(userIDs: string[]) {
  const channel = await prisma.channel.create({
    data: {
      userIDs: [],
    },
  })
  return channel
}

export async function getChannel(id: number) {
  const channel = await prisma.channel.findUnique({
    where: {
      id,
    },
  })
  return channel
}