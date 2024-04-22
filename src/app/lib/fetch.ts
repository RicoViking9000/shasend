'use server'

import { getChannelsByUser } from "./database"

export async function getUserChannels(userId: string) {

  const channels = await getChannelsByUser(userId)
  return channels
}