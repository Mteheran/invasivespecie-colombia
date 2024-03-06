import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { Box, Stack } from "@chakra-ui/react";

export default function Main () {
  return (
      <Box w='100%' h='100vh'>
        <Stack h='100vh'>
          <Box sx={{ "flex-grow": '1' }}>
            <Outlet></Outlet>
          </Box>
          <Footer></Footer>
        </Stack>
        </Box>
  )
}