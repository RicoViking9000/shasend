
import { Divider, Stack } from "@mui/material";
import MessageCard, { Message } from "./MessageCard";
import { Suspense, cache, useEffect, useRef, useState } from "react";
import { getAndDecryptMessages } from "../lib/actions";
import MessageCardSkeleton from "./MessageCardSkeleton";
import { randomUUID } from "crypto";


export const getMessages = cache(async (channelID: string) => {
  const messages = await getAndDecryptMessages(channelID);
  return messages;
})

export default async function MessageStack(
  { channelID }: { channelID: string }
) {

  // const messagesEndRef = useRef<null | HTMLDivElement>(null)

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  // }

  // useEffect(() => {
  //   scrollToBottom()
  // }, [await getMessages(channelID)]);
  
  return (
    <Stack
      spacing={2}
      direction='column'
      divider={<Divider flexItem />}
      sx={{
        marginTop: '1rem',
      }}
    >
      <Suspense fallback={
        new Array(5).fill(0).map((_) => (
          <MessageCardSkeleton key={randomUUID()} />
        ))
      } >
        {(await getMessages(channelID)).map((message: Message) => (
          <MessageCard
            message={message}
            key={message.id}
          />
        ))}
      </Suspense>
    </Stack>
  )
}