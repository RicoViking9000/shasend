import { Avatar, Box, Button, Card, CardContent, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { faker } from '@faker-js/faker';
import React, { useEffect, useRef, useState} from "react";
import { unstable_noStore as noStore } from "next/cache";

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
    console.log(messages);
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
        {messages.map((message, index) => {
          return (
            <Card>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={0.5} display="flex">
                    <Avatar sx={{ transform: 'scale(0.65)' }}>
                      <PersonIcon />
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
        <TextField
          id="message"
          label="Send a message"
          name="message"
          autoComplete="off"
          autoFocus
          maxRows={4}
          sx={{
            width: '100%',
            height: '100%',
          }}
          />
          {/* <input type="submit" style={{ display: 'none' }} /> */}
      </Box>
    </Box></>
  );
}