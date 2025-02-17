import {
  AppBar,
  Typography,
  Container,
  Stack,
  Link,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export const NavLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <Container
      maxWidth="lg"
      sx={{ placeItems: "center", width: "100%", mb: [5, 10] }}
    >
      <AppBar position="static">
        <Typography variant="h6">{t("NavLayout.pokemon")}</Typography>
      </AppBar>
      <Stack width="100%" sx={{ mb: [5, 10] }}>
        <Link href="/">
          <Button>
            <Typography>{t("NavLayout.getBack")}</Typography>
          </Button>
        </Link>
      </Stack>
      {children}
    </Container>
  );
};
