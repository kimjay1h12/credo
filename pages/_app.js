import { ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import theme from "../styles/theme";
import RouterLoader from "../components/routerLoader";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <RouterLoader />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
