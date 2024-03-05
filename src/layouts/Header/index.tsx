import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { AppBar, Toolbar } from "@mui/material";

import { Logo } from "@/components";
import { useAuthStore } from "@/features/auth";
import { Button } from "@/lib/mui";

export const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setupUser = useAuthStore((state) => state.setup);

  const logout = () => {
    setupUser(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
        <Logo />
        {isAuthenticated && (
          <Button
            variant="text"
            startIcon={<LogoutRoundedIcon />}
            sx={{ color: "common.white" }}
            onClick={logout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
