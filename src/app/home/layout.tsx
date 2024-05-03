import { Grid, List } from "@mui/material";
import email from "next-auth/providers/email";
import { Suspense } from "react";
import MessagePane from "../components/MessagePane";
import UserEntrySkeleton from "../components/UserEntrySkeleton";
import UserList from "../components/UserList";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {

  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  const email = session.user?.email || "";
  
    return (
      <Grid container spacing={3} sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        marginY: '0.25rem',
      }}>
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
        <Grid>
          {children}
        </Grid>
      </Grid>
    );
}