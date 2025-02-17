import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Typography>{t("NotFoundPage.message")}</Typography>
    </Stack>
  );
};
