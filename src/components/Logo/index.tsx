import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { Stack, StackProps, Typography } from "@mui/material";

export const Logo = (props: StackProps) => {
  return (
    <Stack direction="row" alignItems="center" gap={1} {...props}>
      <FastfoodRoundedIcon />
      <Typography
        noWrap
        component="h1"
        variant="h6"
        color="inherit"
        sx={{ flexGrow: 1 }}
      >
        Food Delivery App
      </Typography>
    </Stack>
  );
};
