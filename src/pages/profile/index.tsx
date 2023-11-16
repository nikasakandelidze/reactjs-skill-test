import { Grid } from "@mui/material";
import { useUserInfo } from "../../hooks/useUserInfo";

export const Profile = () => {
  const { data } = useUserInfo();
  return <Grid container>{data?.firstName}</Grid>;
};
