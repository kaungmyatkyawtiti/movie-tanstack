"use client";

import Header from "@/components/Header";
import IsAuth from "@/components/IsAuth";
import { Box } from "@mui/material";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header />
      <main>
        {children}
      </main>
      {/* <Footer /> */}
    </Box>
  )
}

export default HomeLayout;
// export default IsAuth(HomeLayout);
