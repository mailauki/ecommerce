import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './styles/App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [count, setCount] = useState(0);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="App">
          <Header />
          
          <Switch>
            <Route path="/testing">
              <h1>Page Count: {count}</h1>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
