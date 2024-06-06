import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, colors } from '@mui/material';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
// import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
// import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import Logout from '@mui/icons-material/Logout'
import { images } from "../assets";
import Animate from "./Animate";
import { AuthContext } from "../services/AuthContext";

const menus = [
  {
    title: "Dashboard",
    icon: <DashboardCustomizeOutlinedIcon />,
    state: ""
  },
];

const serviceMenus = [
  {
    title: "Category",
    icon: <SwapHorizOutlinedIcon />,
    state: "category"
  },
  {
    title: "Theme",
    icon: <ChatBubbleOutlineOutlinedIcon />,
    state: "theme"
  },
];

const investmentMenus = [
  // {
  //   title: "Finance advice",
  //   icon: <ChatBubbleOutlineOutlinedIcon />,
  //   state: "financeadvice"
  // },
  // {
  //   title: "Savings accounts",
  //   icon: <SavingsOutlinedIcon />,
  //   state: "savingaccount"
  // }
];

const Sidebar = ({ sidebarWidth }) => {
  const [activeState, setActiveState] = useState('');

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = (item) => {
    setActiveState(item.state);
    navigate(item.state);
  };

  const MenuItem = (props) => {
    return (
      <ListItem key={props.index} disableGutters disablePadding sx={{ py: 0.5 }} onClick={() => handleClick(props.item)}>
        <ListItemButton sx={{
          borderRadius: "10px",
          bgcolor: props.isActive ? colors.blue[600] : "",
          color: props.isActive ? colors.common.white : "",
          "&:hover": {
            bgcolor: props.isActive ? colors.blue[600] : "",
            color: props.isActive ? colors.common.white : "",
          }
        }}>
          <ListItemIcon sx={{
            minWidth: "40px",
            color: props.isActive ? colors.common.white : ""
          }}>
            {props.item.icon}
          </ListItemIcon>
          <ListItemText primary={
            <Typography fontWeight={600}>
              {props.item.title}
            </Typography>
          } />
        </ListItemButton>
      </ListItem>
    );
  };

  const drawer = (
    <Box
      padding={3}
      paddingBottom={0}
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{
        "::-webkit-scrollbar": {
          display: "none"
        }
      }}
    >
      {/* logo */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Animate type="fade" delay={1}>
          <img src={images.disruptive} alt="logo" height={60} />
        </Animate>
      </Box>
      {/* logo */}
      <Animate sx={{ flexGrow: 1 }}>
        <Paper
          // elevation={0}
          square
          sx={{
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
            p: 2,
            height: "100%",
            boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
          }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <List>
              {menus.map((item, index) => (
                <MenuItem
                  key={index}
                  item={item}
                  isActive={item.state === activeState}
                />
              ))}
            </List>

            <List>
              <ListItem>
                <Typography fontWeight={600} mt={1} color={colors.grey[600]}>
                  Services
                </Typography>
              </ListItem>
              {serviceMenus.map((item, index) => (
                <MenuItem
                  key={index}
                  item={item}
                  isActive={item.state === activeState}
                />
              ))}
            </List>

            <List>
              <ListItem>
                <Typography fontWeight={600} mt={1} color={colors.grey[600]} >
                  Investments
                </Typography>
              </ListItem>
              {investmentMenus.map((item, index) => (
                <MenuItem
                  key={index}
                  item={item}
                  isActive={item.state === activeState}
                />
              ))}
            </List>
          </Box>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Logout style={{ cursor: 'pointer' }} onClick={logout} />
          </Box>
        </Paper>
      </Animate>

    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: sidebarWidth },
        flexShrink: { md: 0 }
      }}
    >
      {/* large screen */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarWidth,
            borderWidth: 0,
            bgcolor: "transparent",
            "::-webkit-scrollbar": {
              display: "none"
            }
          }
        }}
        open
      >
        {drawer}
      </Drawer>
      {/* large screen */}
    </Box>
  );
};

export default Sidebar;