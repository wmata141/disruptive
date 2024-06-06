import React from 'react';
import { Grid } from '@mui/material';
import SummaryGrid from './SummaryGrid';
import ToursData from './ToursData';
import Animate from './Animate';
import UserBookingCard from './UserBookingCard';
import BookedData from './BookedData';

const DashboardView = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SummaryGrid />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Animate delay={1}>
              <UserBookingCard />
            </Animate>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={8}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Animate type="fade" delay={1.5} sx={{ height: "100%" }}>
              <ToursData />
            </Animate>
          </Grid>
          <Grid item xs={12} md={6}>
            <Animate type="fade" delay={2} sx={{ height: "100%" }}>
              <BookedData />
            </Animate>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardView;
