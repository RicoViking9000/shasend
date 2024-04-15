'use client'

import { Avatar, ImageList, ImageListItem, List, ListItem, ListItemAvatar, ListItemText, createTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Grid from '@mui/material/Unstable_Grid2';
import { ThemeWrapper } from "../theme";
import React from "react";
import UserList from "../components/UserList";
import MessagePane from "../components/MessagePane";

export default function Home() {

  return (
    <ThemeWrapper>
      <Grid container spacing={3}>
        <Grid>
          <UserList displayName="John Doe" lastActive="Active 10 minutes ago" />
        </Grid>
        <Grid>
          <MessagePane />
        </Grid>
      </Grid>
    </ThemeWrapper>
  );
}


