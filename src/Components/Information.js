import { Card, Container, Typography } from "@mui/material";

const Information = () => {
  return (
    <Container maxWidth={false} sx={{ paddingTop: 2 }}>
      <Card>
        <Typography variant="h1" align="center">
          Hello Ma!
        </Typography>
      </Card>
    </Container>
  );
};

export default Information;
