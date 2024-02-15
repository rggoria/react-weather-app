import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./App.css";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import { useState } from "react";
import Information from "./Components/Information";

function App() {
  const [mode, setMode] = useState(true);
  const [fetchData, setFetchData] = useState(null);

  const appTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  const toggleMode = () => {
    setMode((prevMode) => !prevMode);
  };

  const fetchGeolocationData = (data) => {
    setFetchData(data);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Box className={mode ? "modeDark" : "modeLight"}>
        <Navbar
          mode={mode}
          toggleMode={toggleMode}
          fetchGeolocationData={fetchGeolocationData}
        />
        <Information fetchData={fetchData} />
      </Box>
      <Footer className="footer" />
    </ThemeProvider>
  );
}

export default App;
