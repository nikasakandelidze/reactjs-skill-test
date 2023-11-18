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
import { useRegister } from "../../hooks/useRegister";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photos: FileList | null;
}

export const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { enqueueSnackbar } = useSnackbar();

  const { handleRegister, loading, error, resetRegister } = useRegister();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = new FormData();
    console.log(data);
    // Append text fields
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.photos) {
      Array.from(data.photos).forEach((file, index) =>
        formData.append(`photos`, file),
      );
    }
    console.log(formData);
    handleRegister(formData);
  };

  useEffect(() => {
    if (loading === "FAILED") {
      enqueueSnackbar({ message: error, variant: "error" });
      resetRegister();
    }
    if (loading === "SUCCESS") {
      enqueueSnackbar({
        message: "Successfully registered",
        variant: "success",
      });
      resetRegister();
      navigate("/login");
    }
  }, [loading, enqueueSnackbar, resetRegister, error]);

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
          label="First Name"
          autoComplete="fname"
          autoFocus
          {...register("firstName", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters",
            },
            maxLength: {
              value: 25,
              message: "First name must be no more than 25 characters",
            },
          })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Last Name"
          autoComplete="lname"
          {...register("lastName", {
            required: "Last name is required",
            minLength: {
              value: 2,
              message: "Last name must be at least 2 characters",
            },
            maxLength: {
              value: 25,
              message: "Last name must be no more than 25 characters",
            },
          })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
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
        <TextField
          margin="normal"
          fullWidth
          type="file"
          inputProps={{
            accept: "image/*",
            multiple: true, // Allow multiple file uploads
          }}
          {...register("photos", {
            required: "Please upload at least four images",
            validate: {
              minFourImages: (files) =>
                (files && files.length >= 4) ||
                "A minimum of 4 images is required",
            },
          })}
          error={!!errors.photos}
          helperText={errors.photos?.message}
        />

        <Box>
          {loading === "IN_PROGRESS" ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Typography
                variant="subtitle2"
                sx={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  "&:hover": { color: (theme) => theme.palette.primary.main },
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account? Login
              </Typography>{" "}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
