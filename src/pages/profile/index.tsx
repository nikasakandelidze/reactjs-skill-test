import { Avatar, CircularProgress, Grid, Typography } from "@mui/material";
import { useUserInfo } from "../../hooks/useUserInfo";
import Carousel from "../../components/Carousel";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

export const Profile = () => {
  const { data, loading, error, resetUser } = useUserInfo();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (loading === "FAILED") {
      enqueueSnackbar({ message: error, variant: "error" });
      resetUser();
    }
  }, [loading, resetUser, enqueueSnackbar, error]);

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
        {loading === "IN_PROGRESS" ? (
          <CircularProgress />
        ) : (
          <>
            <Avatar
              alt={data?.firstName}
              src={data?.avatar}
              sx={{ width: "100px", height: "100px" }}
            />
            <Typography variant="h4">{data?.firstName}</Typography>
            <Typography variant="h4">{data?.email}</Typography>
          </>
        )}
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        {data?.photos && <Carousel images={data?.photos.map((e) => e.url)} />}
      </Grid>
    </Grid>
  );
};
