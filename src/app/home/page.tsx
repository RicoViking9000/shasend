


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
    <>
    <Typography variant="h2" sx={{marginTop: '10vh'}}>Welcome to Shasend</Typography>
    <Typography variant="h5">Select or create a channel from the left pane</Typography>
    </>
  );
}


