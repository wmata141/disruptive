import React from 'react';
import MPaper from './MPaper';
import { Box, Stack } from '@mui/material';
import { assetsImg } from "../../assets";

const API_URL = process.env.REACT_APP_API_URL

const UserBookingCard = (props) => {
  return (
    <MPaper>
      <Stack spacing={3}>
        <Box sx={{
          pt: "100%",
          position: "relative",
          "& img": {
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
            borderRadius: 8
          }
        }}>
          <img src={props.filename ? `${API_URL}/uploads/${props.filename}` : assetsImg.blankPhoto} alt="booking" />
        </Box>
      </Stack>
    </MPaper>
  );
};

export default UserBookingCard;