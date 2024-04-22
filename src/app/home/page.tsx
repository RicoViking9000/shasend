
import { Avatar, ImageList, ImageListItem, List, ListItem, ListItemAvatar, ListItemText, createTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Grid from '@mui/material/Unstable_Grid2';
import { ThemeWrapper } from "../theme";
import React, { Suspense } from "react";
import UserList from "../components/UserList";
import MessagePane from "../components/MessagePane";
import { cookies } from "next/headers";
import { decrypt } from "../lib/session";
import { SessionProvider, getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { data } from "jquery";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  const email = session.user?.email || "";

  return (
    // <ThemeWrapper>
    // <SessionProvider>
      <Grid container spacing={3}>
        <Grid>
          <Suspense fallback={<div>Loading...</div>}>
            <UserList email={email}/>
          </Suspense>
        </Grid>
        <Grid>
          <MessagePane />
        </Grid>
      </Grid>
    // </SessionProvider>
    // </ThemeWrapper>
  );
}


