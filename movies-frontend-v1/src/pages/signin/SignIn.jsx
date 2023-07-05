import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  CheckboxIcon,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, setUser } from "../../api/actions/authActions";

export default function SignIn() {
  const [username, setUsernameS] = useState("");
  const [password, setPassword] = useState("");
  const usernameText = useRef();
  const passwordText = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username: usernameAfterLogin, email: emailAfterLogin } = useSelector(
    (state) => state.user
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/api/auth/signin", {
        username: usernameText.current.value,
        password: passwordText.current.value,
      });
      const { accessToken, username, email } = response.data;
      localStorage.setItem("accessToken", accessToken);

      dispatch(login(accessToken));
      dispatch(setUser(username, email));

      toast.success("Congratulations you've signed in successfully.");

      setUsernameS("");
      setPassword("");
      setTimeout(() => {
        navigate("/");
      }, 3000);

      console.log(username, email);

      console.log("Congratulations you've signed in successfully.");
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occurred. Please try again."
      );
    }
  };
  console.log(usernameAfterLogin);
  console.log(emailAfterLogin);
  return (
    <Flex
      minH={"700rem"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
      color="black"
      _dark={{
        color: "white",
      }}
    >
      <ToastContainer />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text
            fontSize={"lg"}
            color={"gray.600"}
            _dark={{
              color: "white",
            }}
          >
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded="20rem"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="username"
                rounded="10rem"
                value={username}
                ref={usernameText}
                onChange={(e) => setUsernameS(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                rounded="10rem"
                value={password}
                ref={passwordText}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <HStack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox icon={<CheckboxIcon w="15rem" />}>
                  <Text pl="10rem">Remember me</Text>
                </Checkbox>
                <Link
                  color={"black"}
                  _dark={{
                    color: "white",
                  }}
                >
                  Forgot password?
                </Link>
              </HStack>
              <Button
                rounded="10rem"
                bg={"gold"}
                color={"black"}
                _hover={{
                  bg: "gold",
                  transform: "scale(1.05)",
                  background: "#000",
                  color: "#fff",
                  border: "1rem solid gold",
                }}
                onClick={handleSubmit}
                _dark={{
                  color: "black",
                  bg: "white",
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account?{" "}
                <ReactLink to={"/signup"}>Sign Up</ReactLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
