
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Stack, TextField, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { faker } from '@faker-js/faker';
import React, { Suspense, forwardRef, use, useEffect, useRef, useState} from "react";
import { unstable_noStore as noStore } from "next/cache";
import MessageBox from "./MessageBox";
import MessageCard from "./MessageCard";
import { createMessage, getMessagesByChannel, getUser, getUserByEmail } from "../lib/database";
import { getAndDecryptMessages, handleSendMessage } from "../lib/actions";
import { useFormState } from "react-dom";
import MessageStack from "./MessageStack";
import { createDecipheriv, createHash } from "crypto";

export interface PaneState {
  messages: any[];
  email: string;
  channelID: string;
  errors: Object;
}

export default function MessagePane({
  channelID,
  loggedInEmail,
  messageData,
}: {
  channelID: string;
  loggedInEmail: string;
  messageData: any;
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

  const paneState: PaneState = {
    messages: messageData,
    email: loggedInEmail,
    channelID: channelID,
    errors: {},
  };

  // const [messages, setMessages] = useState<Message[]>(messageData);

  // message box hooks


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
      <MessageStack channelID={channelID} />
      <div id='messageEnd' />
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
    <MessageBox paneState={paneState}/>
    </Box></>
  );
}