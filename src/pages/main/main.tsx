import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";

export default function Main() {
  const location = useLocation();
  const [params] = useSearchParams();
  const showSearch = location.pathname !== "/";

  return (
    <Flex direction="column" minH="100vh" bg="brand.50">
      <NavBar showSearch={showSearch} searchValue={params.get("search") ?? ""} />
      <Box as="main" flex="1">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}
