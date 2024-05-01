
import { Divider, Stack } from "@mui/material";
import MessageCard from "./MessageCard";
import { Suspense, cache, useState } from "react";
import { Message } from "./MessagePane";
import { getAndDecryptMessages } from "../lib/actions";
import MessageCardSkeleton from "./MessageCardSkeleton";


export default async function MessageStack(
  { channelID }: { channelID: string }
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
        <MessageCard channelID={channelID} />
      </Suspense>
    </Stack>
  )
}