import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  FmdBad,
  Cloud,
  CalendarToday,
  Place,
  Speed,
  Air,
  WbSunny as SunIcon,
  Brightness2 as MoonIcon,
  FilterDrama as CloudIcon,
  CloudQueue as CloudSunIcon,
  NightsStay as CloudMoonIcon,
  Opacity as FogIcon,
  Waves as ShowersIcon,
  BeachAccess as RainIcon,
  FlashOn as ThunderstormIcon,
  AcUnit as SnowIcon,
} from "@mui/icons-material";
import { createElement } from "react";

const currentDate = new Date();
const options = { weekday: "long", month: "short", day: "numeric" };
const formattedDate = currentDate.toLocaleDateString("en-US", options);

const mapWeatherIcon = (iconId) => {
  const iconMapping = {
    "01d": SunIcon, // clear sky day
    "01n": MoonIcon, // clear sky night
    "02d": CloudSunIcon, // few clouds day
    "02n": CloudMoonIcon, // few clouds night
    "03d": CloudIcon, // scattered clouds day
    "03n": CloudIcon, // scattered clouds night
    "04d": CloudIcon, // broken clouds day
    "04n": CloudIcon, // broken clouds night
    "09d": ShowersIcon, // shower rain day
    "09n": ShowersIcon, // shower rain night
    "10d": RainIcon, // rain day
    "10n": RainIcon, // rain night
    "11d": ThunderstormIcon, // thunderstorm day
    "11n": ThunderstormIcon, // thunderstorm night
    "13d": SnowIcon, // snow day
    "13n": SnowIcon, // snow night
    "50d": FogIcon, // mist day
    "50n": FogIcon, // mist night
  };
  return iconMapping[iconId] || Cloud;
};

const Information = ({ fetchData }) => {
  return (
    <Container maxWidth={false} sx={{ paddingY: 2 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {fetchData ? (
          <>
            <Grid item xs={12} md={4} lg={3} justify="center">
              <Card sx={{ padding: 2 }}>
                <Box paddingBottom={1}>
                  <Typography variant="h4">Now</Typography>
                  <Stack direction="row">
                    <Typography gutterBottom variant="h3" component="div">
                      {fetchData
                        ? fetchData.main.temp >= 100
                          ? (fetchData.main.temp - 273.15).toFixed(1)
                          : fetchData.main.temp.toFixed(1)
                        : ""}
                      <sup>
                        <sup>o</sup>C
                      </sup>
                    </Typography>
                    {fetchData.weather &&
                      fetchData.weather[0].icon &&
                      createElement(mapWeatherIcon(fetchData.weather[0].icon), {
                        sx: {
                          fontSize: 75,
                          marginLeft: "auto",
                          marginRight: "auto",
                        },
                      })}
                  </Stack>
                  <Typography variant="h5">
                    {fetchData &&
                      fetchData.weather &&
                      fetchData.weather[0] &&
                      fetchData.weather[0].description &&
                      fetchData.weather[0].description
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.substring(1)
                        )
                        .join(" ")}
                  </Typography>
                </Box>
                <Divider />
                <Box paddingTop={1}>
                  <Box display="flex" alignItems="center">
                    <CalendarToday style={{ marginRight: "8px" }} />
                    <Typography variant="h6" component="div">
                      {formattedDate}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Place style={{ marginRight: "8px" }} />
                    <Typography variant="h6" component="div">
                      {fetchData.name}, {fetchData.sys.country}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Card sx={{ padding: 2 }}>
                <Typography variant="h4">Today's Highlight</Typography>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12} md={12} lg={12}>
                    <Card sx={{ padding: 2 }}>
                      <h4>Sunrise & Sunset</h4>
                      <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={12} md={6} lg={6}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <SunIcon sx={{ fontSize: 75 }} />
                            <div style={{ marginLeft: "10px" }}>
                              <Typography variant="h4">Sunrise</Typography>
                              <Typography variant="h4">
                                {new Date(
                                  fetchData.sys.sunrise * 1000
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </Typography>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <MoonIcon sx={{ fontSize: 75 }} />
                            <div style={{ marginLeft: "10px" }}>
                              <Typography variant="h4">Sunrise</Typography>
                              <Typography variant="h4">
                                {new Date(
                                  fetchData.sys.sunset * 1000
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </Typography>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Card sx={{ padding: 2 }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Air sx={{ fontSize: 75 }} />
                        <div style={{ marginLeft: "10px" }}>
                          <Typography variant="h4">Humidity</Typography>
                          <Typography variant="h4">
                            {fetchData.main.humidity} %
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Card sx={{ padding: 2 }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Speed sx={{ fontSize: 75 }} />
                        <div style={{ marginLeft: "10px" }}>
                          <Typography variant="h4">Pressure</Typography>
                          <Typography variant="h4">
                            {fetchData.main.pressure} hPa
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6} md={6} lg={6}>
              <Card
                variant="outlined"
                sx={{ padding: "20px", textAlign: "center" }}
              >
                <FmdBad sx={{ fontSize: 75, color: "red" }} />
                <p>
                  Please input or navigate to determine the area weather
                  condition.
                </p>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Information;
