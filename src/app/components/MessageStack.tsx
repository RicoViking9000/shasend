
import { Divider, Stack } from "@mui/material";
import MessageCard from "./MessageCard";
import { Suspense, useState } from "react";
import { Message } from "./MessagePane";


export default function MessageStack(
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
      {/* <Suspense fallback={<div>Loading...</div>} > */}
        <MessageCard messages={messages} />
      {/* </Suspense> */}
    </Stack>
  )
}