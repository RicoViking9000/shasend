import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
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
        "a:visited": {
          color: 'white',
          textDecoration: 'none',
        },
        "a": {
          textDecoration: 'none',
          color: 'white',
        }
      }}>
        <ListItemAvatar>
          <Avatar sx={{ 
              transform: 'scale(1.15)',
              backgroundColor: 'rgba(0, 0, 255, 0.75)',
            }}>
            <Typography variant="h6" color={'white'}>
              {displayName[0]}
            </Typography>
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