'use client'

import { Avatar, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { faker } from '@faker-js/faker';
import React, { useEffect, useRef, useState} from "react";
import { unstable_noStore as noStore } from "next/cache";
import MessageBox from "./MessageBox";
import MessageCard from "./MessageCard";

export default function MessagePane() {

  noStore();

  var dummyData = []
  for (let i = 0; i < 25; i++) {
    dummyData.push({
      content: faker.lorem.paragraph(),
      username: faker.internet.userName(),
      timestamp: faker.date.anytime().toDateString(),
    });
  }

  const [messages, setMessages] = useState(dummyData);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newMessage = {
      content: data.get('message') as string,
      username: 'You',
      timestamp: new Date().toDateString(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };


  return (
    <><Box id='messagePane'
      sx={{
        width: '100%',
        minWidth: '77vw',
        maxWidth: "77vw",
        maxHeight: '80vh',
        overflow: 'scroll',
        alignContent: 'flex-start',
        alignSelf: 'flex-end',
        padding: '1rem',
        margin: '1rem',
      }}
    >
      <Stack
        spacing={2}
        direction='column'
        divider={<Divider flexItem />}
      >
        <MessageCard messages={messages} />
      </Stack>
      <div ref={messagesEndRef} />
    </Box>
    <Box
      sx={{
        width: '100%',
        minWidth: '77vw',
        maxWidth: "77vw",
        maxHeight: '15vh',
        overflow: 'scroll',
        alignContent: 'flex-start',
        alignSelf: 'flex-end',
        padding: '1rem',
        margin: '1rem',
      }}
    >
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <MessageBox setInput={setInput} input={input} />
      </Box>
    </Box></>
  );
}