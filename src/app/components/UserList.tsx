import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import UserEntry from "./UserEntry";
import { faker } from '@faker-js/faker';

export default function UserList({
  displayName,
  lastActive,
}: {
  displayName: string;
  lastActive: string;
}) {

  var usernames: string[] = [];
  var messages: string[] = [];

  for (let i = 0; i < 25; i++) {
    usernames.push(faker.internet.userName());
    messages.push(faker.lorem.sentence(10));
  }

  return (

    <List sx={{ 
      width: '100%',
      maxWidth: "20vw",
      maxHeight: '98vh',
      overflow: 'scroll',
      padding: '1%',
    }}>
      {usernames.map((username, index) =>  {

        return (
          <UserEntry displayName={username} lastActive={messages[index]} />
        );
      
      })}
    
    
    </List>
  );
}