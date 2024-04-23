import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
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
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={0.5} display="flex">
                <Avatar sx={{ transform: 'scale(0.65)' }}>
                  {message.authorName?.[0]}
                </Avatar>
              </Grid>
              <Grid item xs={2} display="flex">
                <Typography display="inline">
                  {message.authorName}
                </Typography>
              </Grid>
              <Grid item display="flex">
                <Typography display="inline" color="text.secondary">
                  {message.timestamp.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
            <Typography color="text.secondary">
              {message.content}
            </Typography>
          </CardContent>
        </Card>
      );
    })}
    </>
  );
}