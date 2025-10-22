import React from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import FirewallManager from "./FirewallManager";
import PerformanceChart from "./PerformanceChart";

export default function FirewallDashboard() {
  return (
    <Container style={{ marginTop: 30 }}>
      <Typography variant="h4" gutterBottom>
        NFV Virtual Firewall
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <FirewallManager />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
