
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Stack, TextField, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { faker } from '@faker-js/faker';
import React, { Suspense, cache, use, useEffect, useOptimistic, useRef, useState} from "react";
import { unstable_noStore as noStore } from "next/cache";
import MessageBox from "./MessageBox";
import MessageCard from "./MessageCard";
import { createMessage, getMessagesByChannel, getUser, getUserByEmail } from "../lib/database";
import { getAndDecryptMessages, handleSendMessage } from "../lib/actions";
import { useFormState } from "react-dom";
import MessageStack from "./MessageStack";
import { createDecipheriv, createHash } from "crypto";
import { Prisma } from "@prisma/client";
import { get } from "jquery";

export interface PaneState {
  messages: any[];
  user: Object;
  channelID: string;
  errors: Object;
}

export interface Message {
  id: string;
  timestamp: Date;
  content: string;
  authorID: string;
  authorName: string;
  channelID: string;
}

export interface b_Message {
  id: string;
  timestamp: Date;
  content: string | null;
  authorID: string;
  channelID: string;
}

export default async function MessagePane({
  channelID,
  loggedInEmail,
  messageData,
}: {
  channelID: string;
  loggedInEmail: string;
  messageData: any;
}) {

  noStore();

  const paneState: PaneState = {
    messages: messageData,
    user: {},
    channelID: channelID,
    errors: {},
  };

  const fetchMessages = cache(async (channelID: string) => {
    const messages = await getAndDecryptMessages(channelID);
    return messages;
  })

  var messages;
  const getMessages: (channelID: string) => Promise<Message[]> = (channelID) => {
    return fetchMessages(channelID).then((data) => {
      return data;
    });
  }

  getMessages(channelID);

  

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], any>(
    getMessages(channelID),
    (state, newMessage: any) => [
      ...state,
      {
        id: 'optimistic',
        timestamp: new Date(),
        content: newMessage.content,
        authorID: newMessage.authorID,
        authorName: newMessage.authorName,
        channelID: newMessage.channelID,
      }
    ]
  )

  async function sendMessage(formData: FormData) {
    const user = await getUserByEmail(loggedInEmail);
    const newState = {...paneState, user: user};
    addOptimisticMessage({
      id: 'optimistic',
      timestamp: new Date(),
      content: formData.get('message') as string,
      authorID: user?.id,
      authorName: user?.name,
      channelID: channelID,
    });
    await handleSendMessage(newState, formData);
  }

  // const [messages, setMessages] = useState<Message[]>(messageData);
  // const [state, action] = useFormState(handleSendMessage, paneState);



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
      <MessageStack messages={optimisticMessages} />
      
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
      <Box
        component="form"
        action={async (formData: FormData) => {
          sendMessage(formData);
        }}
        noValidate
        sx={{ mt: 3 }}
      >
        <MessageBox />
      </Box>
    </Box></>
  );
}