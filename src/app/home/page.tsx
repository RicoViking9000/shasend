


import Grid from '@mui/material/Unstable_Grid2';
import React, { Suspense } from "react";
import UserList from "../components/UserList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Typography } from '@mui/material';

export default async function Home() {

  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  const email = session.user?.email || "";

  return (
    <Grid container spacing={3}>
      <Grid>
        <Suspense fallback={<div>Loading...</div>}>
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


