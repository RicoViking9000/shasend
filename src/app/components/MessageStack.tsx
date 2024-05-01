
import { Divider, Stack } from "@mui/material";
import MessageCard from "./MessageCard";
import { Suspense, useState } from "react";
import { Message } from "./MessagePane";
import MessageCardSkeleton from "./MessageCardSkeleton";


export default async function MessageStack(
  {
    messages,
  }: {
    messages: Message[];
  }
) {
  
  return (
    <Stack
      spacing={2}
      direction='column'
      divider={<Divider flexItem />}
    >
      <Suspense fallback={
        new Array(10).fill(0).map((_) => (
          <MessageCardSkeleton />
        ))
      } >
        <MessageCard messages={messages} />
      </Suspense>
    </Stack>
  )
}