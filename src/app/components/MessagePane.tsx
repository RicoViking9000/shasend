'use client'

import { Avatar, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { faker } from '@faker-js/faker';
import React, { use, useEffect, useRef, useState} from "react";
import { unstable_noStore as noStore } from "next/cache";
import MessageBox from "./MessageBox";
import MessageCard from "./MessageCard";
import { createMessage, getMessagesByChannel } from "../lib/database";
import { handleSendMessage } from "../lib/actions";

interface Message {
  id: string;
  timestamp: Date;
  content: string | null;
  authorID: string;
  channelID: string;
}

export default function MessagePane({
  channelID,
  loggedInID,
}: {
  channelID: string;
  loggedInID: string;
}) {

  noStore();

  // var dummyData = []
  // for (let i = 0; i < 25; i++) {
  //   dummyData.push({
  //     content: faker.lorem.paragraph(),
  //     username: faker.internet.userName(),
  //     timestamp: faker.date.anytime().toDateString(),
  //   });
  // }

  // var messageData = await getMessagesByChannel(channelID);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessagesByChannel(channelID);
      setMessages(messages);
    };

    fetchMessages();
  }, [messages]);

  const sendMessageWithData = handleSendMessage.bind(null, loggedInID, channelID, setInput, messages, setMessages);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    useEffect(() => {

      const sendMessage = async () => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newMessage = await createMessage(
          loggedInID,
          channelID,
          data.get('message') as string,
        );
        setMessages([...messages, newMessage]);
        setInput("");
      };
      sendMessage();
    }
    , [messages]);
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const newMessage = await createMessage(
    //   loggedInID,
    //   channelID,
    //   data.get('message') as string,
    // );
    // const newMessage = {
    //   content: data.get('message') as string,
    //   username: 'You',
    //   timestamp: new Date().toDateString(),
    // };
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
        padding: '0.5rem',
        marginX: '1rem',
        marginY: '0.33rem',
      }}
    >
      <div ref={messagesEndRef} />
    </Box>
    <Box
      sx={{
        width: '100%',
        minWidth: '77vw',
        maxWidth: "77vw",
        maxHeight: '18vh',
        overflow: 'scroll',
        alignContent: 'flex-start',
        alignSelf: 'flex-end',
        padding: '0.5rem',
        marginX: '1rem',
        marginY: '0.33rem',
      }}
    >
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <MessageBox setInput={setInput} input={input} />
      </Box>
    </Box></>
  );
}