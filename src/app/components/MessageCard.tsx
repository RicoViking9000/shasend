import { Avatar, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Message } from "./MessagePane";

export default function MessageCard({
  messages
}: {
  messages: Message[];
  }
  ) {
  return (
    <>
      {messages.map((message) => {
        // const author = await getUser(message.authorID)
      return (
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
      );
    })}
    </>
  );
}