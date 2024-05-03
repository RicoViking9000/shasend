import { ListItem, ListItemAvatar, ListItemText, Skeleton, Typography } from "@mui/material";

export default function UserEntrySkeleton() {
  return (
    <ListItem>
      <ListItemAvatar>
        <Skeleton variant="circular" width={40} height={40} animation="wave"/>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="h6">
          <Skeleton variant="text" width={75} animation="wave"/>
        </Typography>
        <Typography variant="body1">
          <Skeleton variant="text" width={110} animation="wave"/>
        </Typography>
      </ListItemText>
    </ListItem>
  );
}