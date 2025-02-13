import { List, Box, ListItem, Typography, styled } from "@mui/material";
import { Pokemon } from "@/store/slices/pokemon/types";

const StyledStatItem = styled(ListItem)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  height: "7px !important",
  padding: "0",
  backgroundColor: "transparent",
  borderBottom: "0.25em solid #a4a4a4",
  position: "relative",
  zIndex: 2,
}));

const OneItemColumn = ({ stat }: { stat?: Pokemon["stats"][number] }) => {
  const statName = stat?.stat?.name ?? "";
  const statValue = stat?.base_stat ?? 0;
  const statMax = 255;

  const statPercentage = 100 - (statValue / statMax) * 100;

  return (
    <Box display="flex" flexDirection="column">
      <ListItem sx={{ p: 0, gap: "3.5px" }}>
        <List
          sx={{
            gap: "3.5px",
            display: "flex",
            flexDirection: "column",
            p: 0,
            position: "relative",
            background: "white",
            width: ["40px", "60px"],
            overflow: "hidden",
          }}
        >
          {/*
          I could use the array alike [...new Array(8).fill(...)] to loop over and return these items
          but since they always would remain with this length there is no need to that as it would eventually take more resources 
          */}
          <StyledStatItem
            sx={{
              background: "#30a7d7",
              border: "none",
              height: "120% !important",
              zIndex: 1,
              position: "absolute",
              top: `${statPercentage}%`,
            }}
          ></StyledStatItem>
          <StyledStatItem></StyledStatItem>
          <StyledStatItem></StyledStatItem>
          <StyledStatItem></StyledStatItem>
          <StyledStatItem></StyledStatItem>
          <StyledStatItem></StyledStatItem>
          <StyledStatItem></StyledStatItem>
          <StyledStatItem></StyledStatItem>
          <StyledStatItem></StyledStatItem>
          <StyledStatItem></StyledStatItem>
          <StyledStatItem></StyledStatItem>
          <StyledStatItem></StyledStatItem>
        </List>
      </ListItem>
      <Typography
        fontSize="8px"
        whiteSpace="wrap"
        maxWidth="10px"
        lineHeight="2"
        variant="overline"
        color="text.secondary"
      >
        {statName?.toUpperCase() ?? "-"}
      </Typography>
    </Box>
  );
};
export const StatChart = ({ stats }: { stats?: Pokemon["stats"] }) => {
  return (
    <List sx={{ display: "flex", gap: 1, bgcolor: "#a4a4a4", p: 3 }}>
      <OneItemColumn stat={stats?.[0]} />
      <OneItemColumn stat={stats?.[1]} />
      <OneItemColumn stat={stats?.[2]} />
      <OneItemColumn stat={stats?.[3]} />
      <OneItemColumn stat={stats?.[4]} />
      <OneItemColumn stat={stats?.[5]} />
    </List>
  );
};
