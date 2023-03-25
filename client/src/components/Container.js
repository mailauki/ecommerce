import { Stack } from "@mui/material";

export default function Container({ children, align }) {
  return (
    <Stack
      direction="column"
      justifyContent="space-evenly"
      spacing={1}
      sx={{ 
        width: "100%",
        maxWidth: "600px",
        textAlign: align, 
        padding: 2
      }}
    >
      {children}
    </Stack>
  )
}
