import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export default function UserEntry({
  displayName,
  lastActive,
}: {
  displayName: string;
  lastActive: string;
}) {
  return (
    <ListItem alignItems="flex-start">

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
  );
}