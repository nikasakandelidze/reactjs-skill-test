import { Avatar, Grid, Typography } from "@mui/material";
import { useUserInfo } from "../../hooks/useUserInfo";
import Carousel from "../../components/Carousel";

export const Profile = () => {
  const { data } = useUserInfo();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          alt={data?.firstName}
          src={data?.avatar}
          sx={{ width: "100px", height: "100px" }}
        />
        <Typography variant="h4">{data?.firstName}</Typography>
        <Typography variant="h4">{data?.email}</Typography>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        {data?.photos && <Carousel images={data?.photos.map((e) => e.url)} />}
      </Grid>
    </Grid>
  );
};
