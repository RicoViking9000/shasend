import { Avatar, Button, Fab, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import UserEntry from "./UserEntry";
import { faker } from '@faker-js/faker';
import { Add } from "@mui/icons-material";
import CreateChannelButton from "./CreateChannelButton";
import { getChannelsByUser, getMostRecentMessageByChannel, getUser, getUserByEmail } from "../lib/database";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";


export default async function UserList({
  email,
}: {
  email: string;
}) {

  // const { data: session } = useSession();
  // var loggedInID = session?.user?.id || '';

  // console.log("UserList: session: ", session)

  if (!email) {
    return null;
  }

  const loggedInUser = await getUserByEmail(email || '');
  const loggedInID = loggedInUser?.id;
  const channels = await getChannelsByUser(loggedInID || "")

  return (

    <List sx={{ 
      width: '100%',
      minWidth: '20vw',
      maxWidth: "20vw",
      maxHeight: '98vh',
      overflow: 'scroll',
      padding: '1%',
    }}>
      <CreateChannelButton />
      {channels.map(async (channel, index) =>  {
        const channelUsernamesWithoutSelf = await Promise.all(channel.userIDs.filter(userID => userID !== loggedInID).map(async userID => {
          const user = await getUser(userID);
          return user?.name;
        }
        ));
        const lastActive = (await getMostRecentMessageByChannel(channel.id))?.timestamp;

        return (
          <UserEntry
            displayName={channelUsernamesWithoutSelf.join(', ') || ""}
            lastActive={lastActive ? lastActive.toTimeString() : ""}
            channelID={channel.id}
          />
        );
      })}
    </List>
  );
}