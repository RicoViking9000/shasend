


import Grid from '@mui/material/Unstable_Grid2';
import React, { Suspense } from "react";
import UserList from "../components/UserList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Skeleton, Typography } from '@mui/material';

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
            <Skeleton variant="rectangular" width="20vw" height="98vh" />
          }>
          <UserList email={email}/>
        </Suspense>
      </Grid>
      <Grid sx={{
        marginTop: '10vh',
      }}>
        <Typography variant="h3">Welcome to Shasend</Typography>
        <Typography variant="h6">Select or create a channel on the left pane</Typography>
      </Grid>
    </Grid>
  );
}


