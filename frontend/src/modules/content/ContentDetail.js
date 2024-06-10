import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box, Typography } from "@mui/material";
import Animate from './Animate';
import UserBookingCard from './UserBookingCard';
import ReactPlayer from 'react-player'

const ContentDetailView = () => {
  const location = useLocation();

  const detailContent = location.state.item

  return (
    <div>
      {/* <div style={{ margin: '1%', paddingTop: '1%', alignItems: 'baseline' }}>
        <Button
          style={{ backgroundColor: colors.blue[500], marginRight: '1%', height: '2.5rem' }}
          onClick={functionAdd}
          variant="contained"
          disabled={user.type !== 'admin'}
        >Add New
        </Button>
        <TextField
          autoComplete="off"
          value={filter}
          onChange={e => { handleFilter(e.target.value) }}
          variant="outlined"
          size="small"
        />
      </div> */}
      <Box>
        <Animate type="fade" delay={1}>
          <Typography
            display="inline"
            fontWeight="bold"
            variant="h4"
          >
            {detailContent.name}
          </Typography>
          <Typography
            variant="h6"
          >
            {detailContent.description} <br />
            {`${detailContent.theme.name} - ${detailContent.theme.description}`}
          </Typography>
        </Animate>
      </Box>

      <div style={{ margin: '1%', paddingTop: '1%', alignItems: 'baseline', marginBottom: 'inherit' }}>
        <Grid container spacing={3}>
          {
            detailContent.filenames && detailContent.filenames.map((item, index) => (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4} xl={3} >
                <Animate type="fade" delay={(index + 1) / 3}>
                  <UserBookingCard filename={item} />
                </Animate>
              </Grid>
            ))
          }
        </Grid>
      </div>

      <div style={{ margin: '1%', paddingTop: '1%', alignItems: 'baseline', marginBottom: 'inherit' }}>
        <ReactPlayer url={detailContent.video} />
      </div>
    </div>
  );
};

export default ContentDetailView;
