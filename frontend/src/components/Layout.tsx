import { Grid, GridItem, Show } from "@chakra-ui/react";
import "../styles/App.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"aside nav" "aside main"` }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <GridItem area="nav" boxShadow="md" margin={5} borderRadius={15}>
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem
          area="aside"
          pos="fixed"
          width="250px"
          height="100vh"
          paddingX={5}
          boxShadow="xl"
        >
          <Sidebar />
        </GridItem>
      </Show>
      <GridItem area="main" margin={7}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
