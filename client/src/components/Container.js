import { Stack } from "@mui/material";

export default function Container({ children, align, justify }) {
  return (
    <Stack
      direction="column"
      alignItems={align}
      justifyContent={justify || "space-between"}
      spacing={1}
      sx={{ 
        width: "100%",
        maxWidth: "600px",
        textAlign: align || "center", 
        mt: "65px",
        mb: "30px",
        p: 2
      }}
    >
      {children}
    </Stack>
  )
}
