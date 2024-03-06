import { Box, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";

export default function Main () {
  return (
    <Stack h='100vh'>
      <Box sx={{ "flex-grow": '1' }}>
        <Outlet></Outlet>
      </Box>
      <Footer></Footer>
    </Stack>
  );
}