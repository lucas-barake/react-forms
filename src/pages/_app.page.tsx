import { type AppType } from "next/dist/shared/lib/utils";

import "$/styles/globals.css";
import { Toaster } from "$/components/ui/toaster";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
