import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";

export default function UserEntry({
  displayName,
  lastActive,
  channelID,
}: {
  displayName: string;
  lastActive: string;
  channelID: string;
}) {
  return (
    <Link href={{
      pathname: '/home/' + channelID,
    }}>
      <ListItem alignItems="flex-start" sx={{
        ":hover": {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          transitionDuration: '0.5s',
        },
      }}>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
        sx={
          {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }
        }
          primary={displayName}
          secondary={lastActive}
          secondaryTypographyProps={{
            paddingTop: '0.5rem',
          }}
        />
      </ListItem>
    </Link>
  );
}