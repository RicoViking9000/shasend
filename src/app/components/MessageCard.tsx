import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { cache, useEffect, useRef } from "react";
import { getAndDecryptMessages } from "../lib/actions";
import { Prisma } from "@prisma/client";
import { getUser } from "../lib/database";


export interface Message {
  id: string;
  timestamp: Date;
  content: string | null;
  authorID: string;
  channelID: string;
}

const getUsername = cache(async (authorID: string) => {
  const user = await getUser(authorID);
  return user?.name || 'Unknown';
})

export default async function MessageCard({
  message
}: {
  message: Message
  }
  ) {
  const username = await getUsername(message.authorID);
  return (
    <>
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ 
                  transform: 'scale(1.15)',
                  backgroundColor: 'rgba(0, 0, 255, 0.75)',
                }}>
                <Typography variant="h6" color={'white'}>
                  {username[0]}
                </Typography>
              </Avatar>
            }
            title={username}
            subheader={message.timestamp.toLocaleString()}
          >
          </CardHeader>
          <CardContent>
            <Typography color="text.secondary" fontSize={'1.1rem'}>
              {message.content}
            </Typography>
          </CardContent>
        </Card>
    </>
  );
}