import { useMemo } from "react";
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
import ProductForm from "./pages/ProductForm";

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="App">
          <Header />
          
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth/>} />
            <Route path="/products/add" element={<ProductForm />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
