import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  FormControlLabel,
  Switch,
  Box,
  TextField,
  Button,
  Container,
  InputAdornment,
  Snackbar,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Cloud,
  Close,
  Error,
  Search,
  Settings,
  Place,
} from "@mui/icons-material";
import getGeolocation from "../config/geolocation";
import getCity from "../config/city";

const Navbar = ({ mode, toggleMode, fetchGeolocationData }) => {
  const [searchArea, setSearchArea] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = (e) => {
    setSearchArea(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchArea) {
      setOpenSnackbar(true);
      return;
    }
    try {
      const data = await getCity(searchArea);
      if (data === undefined) {
        setOpenSnackbar(true);
      } else {
        fetchGeolocationData(data);
      }
    } catch (error) {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const handleLocation = async () => {
    try {
      const data = await getGeolocation();
      fetchGeolocationData(data);
    } catch (error) {
      setOpenSnackbar(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" alignItems="center">
            <Cloud style={{ fontSize: 32, marginRight: 8 }} />
            <Typography variant="h6" noWrap>
              Weather App
            </Typography>
          </Box>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                required
                placeholder="Search"
                value={searchArea}
                variant="outlined"
                size="small"
                sx={{ width: "auto" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Error sx={{ mr: 1, color: "error.main" }} />
                    <span>Oops! The city you entered is not valid.</span>
                  </div>
                }
                action={
                  <IconButton
                    size="small"
                    color="inherit"
                    onClick={handleCloseSnackbar}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                }
              />
              <Button
                variant="contained"
                style={{ marginLeft: "1rem", backgroundColor: "green" }}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Container>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Settings />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <FormControlLabel
                  control={<MaterialUISwitch sx={{ m: 1 }} />}
                  label="Switch Mode"
                  onChange={toggleMode}
                  checked={mode}
                />
              </MenuItem>
              <MenuItem>
                <Button
                  variant="contained"
                  startIcon={<Place />}
                  onClick={handleLocation}
                  fullWidth
                >
                  Get Location
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
