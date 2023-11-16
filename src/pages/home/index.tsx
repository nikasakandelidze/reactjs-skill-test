import { Button, Divider, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid
        item
        xs={12}
        textAlign="center"
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h2" fontWeight="400">
          Welcome To ReactJS Skills Test
        </Typography>
        <Typography variant="h4" fontWeight="100" width="70%">
          This is the ReactJS project showcasing my skills using basic required
          features and some of my own extensions
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        flex={1}
        justifyContent="center"
        padding="20px"
      >
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Divider
          orientation="vertical"
          sx={{ marginLeft: "10px", marginRight: "10px" }}
        />
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};
