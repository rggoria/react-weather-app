import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./App.css";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import { useState } from "react";
import Information from "./Components/Information";

function App() {
  const [mode, setMode] = useState(true);

  const appTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
  });

  const toggleMode = () => {
    setMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Box className={mode ? "modeDark" : "modeLight"}>
        <Navbar mode={mode} toggleMode={toggleMode} className="navbar" />
        <Information />
      </Box>
      <Footer className="footer" />
    </ThemeProvider>
  );
}

export default App;
