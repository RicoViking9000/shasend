import { Card, CardContent, CardHeader, Skeleton, Typography } from "@mui/material";

export default function MessageCardSkeleton() {
  return (
    <Card>
      <CardHeader
        avatar={
          <Skeleton variant="circular" width={40} height={40} animation="wave"/>
        }
        title={<Skeleton variant="text" width={100} animation="wave"/>}
        subheader={<Skeleton variant="text" width={60} animation="wave"/>}
      >
      </CardHeader>
      <CardContent>
        <Typography color="text.secondary" fontSize={'1.1rem'}>
          <Skeleton variant="text" width={200} animation="wave" />
        </Typography>
      </CardContent>
    </Card>
  );
}