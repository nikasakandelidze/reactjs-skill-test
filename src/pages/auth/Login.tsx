import { Button, Grid, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // Here, you can handle the registration logic (e.g., sending data to a server)
  };

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
        <Typography variant="h4">Register new account</Typography>
        <Typography variant="subtitle1" fontWeight="100">
          Please input all the necessary information and register to continue
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
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: {
              value: 50,
              message: "Password must be no more than 50 characters",
            },
            pattern: {
              value: /.*[0-9].*/,
              message: "Password must contain at least one number",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
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
            // Here, you can navigate to the login page
            navigate("/register");
          }}
        >
          Don't have an account? Register
        </Typography>
      </Grid>
    </Grid>
  );
};
