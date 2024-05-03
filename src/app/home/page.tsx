


import Grid from '@mui/material/Unstable_Grid2';
import React, { Suspense } from "react";
import UserList from "../components/UserList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Box, List, Skeleton, Typography } from '@mui/material';
import UserEntrySkeleton from '../components/UserEntrySkeleton';

export default async function Home() {

  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  const email = session.user?.email || "";

  return (
    <>
    <Box id='messagePane'
      sx={{
        width: '100%',
        minWidth: '78vw',
        maxWidth: "78vw",
        maxHeight: '89vh',
        overflow: 'scroll',
        alignContent: 'flex-start',
        alignSelf: 'flex-end',
        paddingX: '0.1rem',
        marginX: '0.5rem',
        // marginY: '0.66rem',
      }}
    >
      <Typography variant="h2" sx={{marginTop: '10vh'}}>Welcome to Shasend</Typography>
      <Typography variant="h5">Select or create a channel from the left pane</Typography>
    </Box>
    </>
  );
}


