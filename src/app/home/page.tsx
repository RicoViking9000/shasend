


import Grid from '@mui/material/Unstable_Grid2';
import React, { Suspense } from "react";
import UserList from "../components/UserList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { List, Skeleton, Typography } from '@mui/material';
import UserEntrySkeleton from '../components/UserEntrySkeleton';

export default async function Home() {

  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  const email = session.user?.email || "";

  return (
    <Grid container spacing={3}>
      <Grid>
        <Suspense fallback={
            new Array(6).fill(0).map((_) => (
              <List sx={{ 
                width: '100%',
                minWidth: '17vw',
                maxWidth: "17vw",
                maxHeight: '98vh',
                overflow: 'scroll',
                padding: '1%',
              }}>
                <UserEntrySkeleton />
              </List>
            ))
          }>
          <UserList email={email}/>
        </Suspense>
      </Grid>
      <Grid sx={{
        marginTop: '10vh',
      }}>
        <Typography variant="h2">Welcome to Shasend</Typography>
        <Typography variant="h5">Select or create a channel from the left pane</Typography>
      </Grid>
    </Grid>
  );
}


