
import React, { Suspense } from "react";
import UserList from "../../components/UserList";
import MessagePane from "../../components/MessagePane";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAndDecryptMessages } from '@/app/lib/actions';
import { List, Skeleton } from '@mui/material';
import UserEntrySkeleton from '@/app/components/UserEntrySkeleton';

export const revalidate = 20;

export default async function Home({ params }: {params: {id: string}}) {

  const session = await auth();
  if (!session) {
    return redirect('/login');
  }
  const email = session.user?.email || "";

  const channelID = params.id;
  const messagesWithMappedAuthors = await getAndDecryptMessages(channelID);


  return (
    <MessagePane channelID={params.id} loggedInEmail={email} messageData={messagesWithMappedAuthors} />
  );
}