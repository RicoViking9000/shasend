
import Grid from '@mui/material/Unstable_Grid2';
import React, { Suspense } from "react";
import UserList from "../../components/UserList";
import MessagePane from "../../components/MessagePane";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAndDecryptMessages } from '@/app/lib/actions';

export default async function Home({ params }: {params: {id: string}}) {

  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  const email = session.user?.email || "";

  const channelID = params.id;
  const messagesWithMappedAuthors = await getAndDecryptMessages(channelID);


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
          <MessagePane channelID={params.id} loggedInEmail={email} messageData={messagesWithMappedAuthors} />
        </Grid>
      </Grid>
    // </SessionProvider>
    // </ThemeWrapper>
  );
}