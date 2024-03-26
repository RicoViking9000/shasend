import { TextField } from "@mui/material";
import { useState } from "react";

export default function MessageBox(
  {
    input,
    setInput,
  }: {
    input: string;
    setInput: (input: string) => void;
  
  }
) {

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