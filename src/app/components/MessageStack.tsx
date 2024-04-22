'use client'

import { Divider, Stack } from "@mui/material";
import MessageCard from "./MessageCard";
import { useState } from "react";

export default function MessageStack(
  {
    messageData,
  }: {
    messageData: any[];
  }
) {

  const [messages, setMessages] = useState(messageData);
  
  return (
    <Stack
      spacing={2}
      direction='column'
      divider={<Divider flexItem />}
    >
      <MessageCard messages={messages} />
    </Stack>
  )
}