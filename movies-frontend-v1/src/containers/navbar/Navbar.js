import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Center,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  useColorMode,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { connect, useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../../api/actions/authActions";

const NAV_ITEMS = [
  { label: "Watchlist" },
  { label: "Reviews" },
  {
    label: "Genres",
    children: [
      {
        label: "Comedy",
        subLabel: "Laugh out loud and lighten your day",
        href: "#",
      },
      {
        label: "Action",
        subLabel: "Non-stop thrills and excitement",
        href: "#",
      },
      {
        label: "Drama",
        subLabel: "Emotionally engaging storytelling",
        href: "#",
      },
      {
        label: "Sci-Fi",
        subLabel: "Explore the realms of the future",
        href: "#",
      },
      {
        label: "Fantasy",
        subLabel: "Escape into enchanting worlds",
        href: "#",
      },
      {
        label: "Romance",
        subLabel: "Indulge in love and passion",
        href: "#",
      },
      {
        label: "Thriller",
        subLabel: "Keeps you on the edge of your seat",
        href: "#",
      },
      {
        label: "Horror",
        subLabel: "Prepare for bone-chilling scares",
        href: "#",
      },
      {
        label: "Adventure",
        subLabel: "Embark on thrilling journeys",
        href: "#",
      },
      {
        label: "Animation",
        subLabel: "Magical tales brought to life",
        href: "#",
      },
    ],
  },
  { label: "Top IMDB" },
];

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  username: state.auth.username, // Add username from the Redux store
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

const WithSubnavigation = ({ isLoggedIn, username }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username: usernameAfterLogin, email: emailAfterLogin } = useSelector(
    (state) => state.user
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/signin"); // Redirect to the sign-in page after logout
  };

  // console.log({ usernameAfterLogin, emailAfterLogin });

  return (
    <Box>
      <Flex
        bg={useColorModeValue("black", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60rem"}
        py={{ m: 2 }}
        px={{ m: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gold", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ m: 1, d: "auto" }}
          ml={{ m: -2 }}
          display={{ m: "flex", d: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            color="white"
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ m: 1 }} justify={{ m: "center", d: "start" }}>
          <Text
            as="a"
            href="/"
            textAlign={useBreakpointValue({ m: "center", d: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gold", "white")}
            fontSize="25rem"
          >
            Movie Review
          </Text>

          <Flex display={{ m: "none", d: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {isLoggedIn ? (
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="20rem"
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    w="30rem"
                    h="30rem"
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      w="30rem"
                      h="30rem"
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{usernameAfterLogin}</p> {/* Display the username */}
                  </Center>
                  <Center>
                    <p>{emailAfterLogin}</p> {/* Display the username */}
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        ) : (
          <Stack
            flex={{ m: 1, d: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Center>
              <ReactLink to="/signin">
                <Button
                  as={"u"}
                  fontSize={"md"}
                  fontWeight={400}
                  color="white"
                  variant={"link"}
                  _hover={{
                    color: "gold",
                    as: "a",
                    textDecoration: "none",
                    _dark: { color: "gray.200", transform: "scale(1.15)" },
                  }}
                >
                  Sign In
                </Button>
              </ReactLink>
            </Center>
            <Button
              as={"a"}
              display={{ m: "none", d: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              rounded="10rem"
              color={"black"}
              bg={"gold"}
              href={"/signup"}
              _dark={{ color: "gray.900", bg: "white" }}
              _hover={{
                bg: "gold",
                transform: "scale(1.05)",
                background: "#fff",
                color: "#000",
              }}
            >
              Sign Up
            </Button>
          </Stack>
        )}
        <Box ml="30rem">
          <Button
            onClick={toggleColorMode}
            rounded="10rem"
            bg="gold"
            color="black"
            _dark={{ color: "gray.900", bg: "white" }}
            _hover={{
              bg: "gold",
              transform: "scale(1.05)",
              background: "#fff",
              color: "#000",
            }}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WithSubnavigation);

const DesktopNav = () => {
  const linkColor = useColorModeValue("white", "gray.200");
  const linkHoverColor = useColorModeValue("gold", "white");
  const popoverContentBgColor = useColorModeValue("black", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} my="auto">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"md"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"d"}
      color="white"
      _hover={{ bg: useColorModeValue("hsla(44, 81%, 81%, 1)", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "black" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"} color="black">
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10rem)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"black"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("black", "gray.800")}
      p={4}
      display={{ d: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={useColorModeValue("white", "gray.200")}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
