import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";

export interface GlobalHeaderProps {
  title: string;
  subtitle?: string; 
}

export function GlobalHeader({ title,subtitle }: GlobalHeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{
            background:
              "linear-gradient(45deg, rgb(0, 91, 172), rgb(94, 194, 198))",
          }}
        >
          <Link href="/">
            <PeopleIcon fontSize={"large"} sx={{ mr: 2 }} />
          </Link>
          <Link href="/">
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </Link>
          {subtitle && (
            <Typography
              variant="subtitle1"
              component="span"
              sx={{ ml: 2, fontWeight: "normal" }}
            >
              - {subtitle}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
