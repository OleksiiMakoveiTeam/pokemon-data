import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

// Since this is going to be rendered within the NavLayout, we don't need to add a header
export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Typography>{t("NotFoundPage.message")}</Typography>
    </Stack>
  );
};
