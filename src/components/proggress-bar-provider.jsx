"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressBarProvider = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="white"
        options={{ showSpinner: false }}
        shallowRouting 
      />
    </>
  );
};

export default ProgressBarProvider;
