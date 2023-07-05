import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import api from "../../api/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usernameText = useRef();
  const emailText = useRef();
  const passwordText = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/api/auth/signup", {
        username: usernameText.current.value,
        email: emailText.current.value,
        password: passwordText.current.value,
        roles: ["user"],
      });
      toast.success(response.data.message);

      setUsername("");
      setEmail("");
      setPassword("");

      navigate("/signin");
    } catch (error) {
      toast.error(
        error.response.data.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <Flex
      minH={"700rem"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      color="black"
    >
      <ToastContainer />
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading
            fontSize={"4xl"}
            textAlign={"center"}
            _dark={{
              color: "white",
            }}
          >
            Sign up
          </Heading>
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
          rounded={"20rem"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w="450rem"
          _dark={{
            color: "white",
          }}
        >
          <Stack spacing="16rem">
            <FormControl id="firstName" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                rounded="10rem"
                value={username}
                ref={usernameText}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                rounded="10rem"
                value={email}
                ref={emailText}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  rounded="10rem"
                  value={password}
                  ref={passwordText}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    rounded="10rem"
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                display={{ m: "none", d: "inline-flex" }}
                rounded="10rem"
                loadingText="Submitting"
                size="lg"
                bg={"gold"}
                color={"black"}
                _dark={{
                  color: "black",
                  bg: "white",
                }}
                _hover={{
                  bg: "gold",
                  transform: "scale(1.05)",
                  background: "#000",
                  color: "#fff",
                  border: "1rem solid gold",
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <ReactLink to={"/signin"}>Login</ReactLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
