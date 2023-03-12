import { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Product from "./pages/Product";
import Profile from "./pages/Profile";

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [count, setCount] = useState(0);
  const [currentUser, setUser] = useState({});

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
      .then((data) => setCount(data.count))
    fetch("/me")
    .then((r) => r.json())
    .then((user) => setUser(user))
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="App">
          <Header user={currentUser} />
          
          <Routes>
            <Route path="/testing" element={<h1>Page Count: {count}</h1>} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth/>} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/me" element={<Profile user={currentUser} />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
