import { ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import theme from "../styles/theme";
import RouterLoader from "../components/routerLoader";
import GlobalProvider from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <RouterLoader />
        {/* <Splashscreen /> */}
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default MyApp;
