import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Grid container display="flex" justifyContent="center">
      <Typography variant="h3">Page Not Found &nbsp;</Typography>
      <Typography
        variant="h3"
        sx={{
          textDecoration: "underline",
          cursor: "pointer",
          "&:hover": { color: (theme) => theme.palette.primary.main },
        }}
        onClick={() => navigate("/")}
      >
        Go to home page?
      </Typography>
    </Grid>
  );
};
