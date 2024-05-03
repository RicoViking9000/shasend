'use client';

import { Box, TextField } from "@mui/material";
import { useEffect, useRef, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { handleSendMessage } from "../lib/actions";
import { PaneState } from "./MessagePane";
import { event } from "jquery";

export default function MessageBox(
  { paneState }: { paneState: PaneState }
) {

  const [input, setInput] = useState<string>('');

  const [state, action] = useFormState(handleSendMessage, paneState);

  const [isPending, startTransition] = useTransition();

  const messagesEndRef = useRef<null | HTMLElement>(document.getElementById('messageEnd'))

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [isPending]);

  function clearInput() {
    startTransition(() => {
      setInput('');
    });
  }

  return (
    <Box component="form" id="messageBox" noValidate action={action} onSubmit={clearInput} sx={{ mt: 3 }}>
      <TextField
        id="message"
        label="Send a message"
        name="message"
        autoComplete="off"
        value={input}
        autoFocus
        disabled={isPending}
        // onKeyDown={handleKeyDown}
        sx={{
          width: '100%',
          height: '100%',
        }}
        onChange={(e) => setInput(e.target.value)}
      />
    </Box>
  );
}