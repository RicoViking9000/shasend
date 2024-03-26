import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";


export default function MessageCard({
  messages
}: {
  messages: {
    content: string;
    username: string;
    timestamp: string;
  
  }[];
  }
  ) {
  return (
    <>
      {messages.map((message) => {
      return (
        <Card>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={0.5} display="flex">
                <Avatar sx={{ transform: 'scale(0.65)' }}>
                  {message.username[0]}
                </Avatar>
              </Grid>
              <Grid item xs={2} display="flex">
                <Typography display="inline">
                  {message.username}
                </Typography>
              </Grid>
              <Grid item display="flex">
                <Typography display="inline" color="text.secondary">
                  {message.timestamp}
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