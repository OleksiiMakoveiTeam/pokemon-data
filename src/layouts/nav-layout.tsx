import {
  AppBar,
  Typography,
  Container,
  Stack,
  Link,
  Button,
} from "@mui/material";

export const NavLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ placeItems: "center", width: "100%", mb: [5, 10] }}
    >
      <AppBar position="static">
        <Typography variant="h6">Pokemon</Typography>
      </AppBar>
      <Stack width="100%" sx={{ mb: [5, 10] }}>
        <Link href="/pokedex">
          <Button>
            <Typography>Get back</Typography>
          </Button>
        </Link>
      </Stack>
      {children}
    </Container>
  );
};
