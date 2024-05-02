'use client'

import { Box, TextField } from "@mui/material";
import { startTransition, useState, useTransition } from "react";
import { handleSendMessage } from "../lib/actions";

export default function MessageBox(
  // { onSubmit }: { onSubmit: (message: string) => void }
) {

  const [input, setInput] = useState<string>('');

  return (
    <TextField
      id="message"
      label="Send a message"
      name="message"
      autoComplete="off"
      value={input}
      autoFocus
      maxRows={4}
      sx={{
        width: '100%',
        height: '100%',
      }}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}