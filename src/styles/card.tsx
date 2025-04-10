import { styled, Card } from "@mui/material";

export const ClickableCard = styled(Card)({
    cursor: "pointer",
    "&:hover": {
        boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
    },
});
