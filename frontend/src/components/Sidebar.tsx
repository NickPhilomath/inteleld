import { Link } from "react-router-dom";
import { HStack, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { TbMap, TbStack2, TbUsers, TbTruck, TbLogout } from "react-icons/tb";

const Sidebar = () => {
  const data = [
    { name: "Map", link: "/map", icon: <TbMap size="23px" /> },
    { name: "Logs", link: "/logs", icon: <TbStack2 size="23px" /> },
    { name: "Drivers", link: "/drivers", icon: <TbUsers size="23px" /> },
    { name: "Trucks", link: "/trucks", icon: <TbTruck size="23px" /> },
    { name: "Log out", link: "/logout", icon: <TbLogout size="23px" /> },
  ];

  return (
    <>
      <Heading size="md" marginTop={9} marginBottom={3}>
        Intel ELD
      </Heading>
      <List mt={10}>
        {data.map((item, index) => {
          return (
            <ListItem
              key={index}
              mb={2}
              fontSize={15}
              padding={2}
              borderRadius={7}
            >
              <Link to={item.link}>
                <HStack>
                  {item.icon}
                  <Text fontWeight="bold">{item.name}</Text>
                </HStack>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default Sidebar;
