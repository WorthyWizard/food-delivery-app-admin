import { List, styled } from "@mui/material";

export const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  padding: theme.spacing(1),
  overflow: "auto",
})) as typeof List;
