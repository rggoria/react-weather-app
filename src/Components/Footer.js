import { Typography, Container, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";

const Footer = () => {
  const theme = useTheme();

  return (
    <footer
      style={{
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : theme.palette.primary.main,
        color:
          theme.palette.mode === "dark"
            ? theme.palette.text.primary
            : theme.palette.primary.contrastText,
        padding: "20px 0",
        marginTop: "auto",
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            xs={4}
            container
            justifyContent="center"
            alignItems="center"
          >
            {/* Empty Grid Item */}
          </Grid>
          <Grid
            item
            xs={4}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="body2" align="center">
              &copy; {new Date().getFullYear()} Developed by Ram Emerson S.
              Goria
            </Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="end" alignItems="center">
            <Typography variant="body2">Version 1.0</Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
