import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

interface IFormInput {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const { error, loading, handleLogin, resetLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    handleLogin(data);
  };

  useEffect(() => {
    if (loading === "FAILED") {
      enqueueSnackbar({ message: error, variant: "error" });
      resetLogin();
    }
    if (loading === "SUCCESS") {
      enqueueSnackbar({ message: "Login successful!", variant: "success" });
      navigate("/profile");
    }
  }, [loading, enqueueSnackbar, resetLogin, error, navigate]);

  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      alignItems="center"
      rowSpacing={3}
    >
      <Grid item xs={8}>
        <Typography variant="h4">Login using existing account</Typography>
        <Typography variant="subtitle1" fontWeight="100">
          Login to access user page and see your profile details
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          margin="normal"
          fullWidth
          label="Email Address"
          autoComplete="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Box>
          {loading === "IN_PROGRESS" ? (
            <CircularProgress size={30} />
          ) : (
            <>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Typography
                variant="subtitle2"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  "&:hover": { color: (theme) => theme.palette.primary.main },
                }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Don't have an account? Register
              </Typography>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
