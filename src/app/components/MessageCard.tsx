import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Message } from "./MessagePane";
import { cache, useEffect, useRef } from "react";
import { getAndDecryptMessages } from "../lib/actions";

export const getMessages = cache(async (channelID: string) => {
  const messages = await getAndDecryptMessages(channelID);
  return messages;
})


export default async function MessageCard({
  channelID
}: {
  channelID: string;
  }
  ) {
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
      scrollToBottom()
    }, [await getMessages(channelID)]);
  return (
    <>
      {(await getMessages(channelID)).map((message) => (
        // const author = await getUser(message.authorID)
        <Card>
          <CardHeader
            avatar={
              <Avatar sx={{ 
                  transform: 'scale(1.15)',
                  backgroundColor: 'rgba(0, 0, 255, 0.75)',
                }}>
                <Typography variant="h6" color={'white'}>
                  {message.authorName?.[0]}
                </Typography>
              </Avatar>
            }
            title={message.authorName}
            subheader={message.timestamp.toLocaleString()}
          >
          </CardHeader>
          <CardContent>
            <Typography color="text.secondary" fontSize={'1.1rem'}>
              {message.content}
            </Typography>
          </CardContent>
        </Card>
      )
    )}
    <div ref={messagesEndRef} />
    </>
  );
}