import React, { useState } from "react";
import {
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Textarea,
  Box,
  HStack,
  border,
} from "@chakra-ui/react";
import { connect, useSelector } from "react-redux";

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  username: state.auth.username, // Add username from the Redux store
});

const ReviewForm = ({
  handleFormSubmit,
  revText,
  labelText,
  revName,
  isLoggedIn,
  username,
}) => {
  const [characterCount, setCharacterCount] = useState(0);
  const { username: usernameAfterLogin } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    const rev = revText.current.value;
    const rav = isLoggedIn ? usernameAfterLogin : revName.current.value;

    const capitalizedName = rav.charAt(0).toUpperCase() + rav.slice(1);

    if (rev.trim() === "" || capitalizedName.trim() === "") {
      return; // Exit early if name or message is empty
    }

    if (rev.length > 200) {
      return; // Exit early if message exceeds 200 characters
    }

    handleFormSubmit();
  };

  return (
    <Stack
      spacing="10rem"
      bg={useColorModeValue("white", "gray.700")}
      rounded="20rem"
      boxShadow={"lg"}
      w="full"
      p="15rem"
    >
      <Text
        fontSize={{ m: "25rem", d: "25rem" }}
        color={useColorModeValue("gray.800", "gray.400")}
        _dark={{
          color: "white",
        }}
      >
        {labelText}
      </Text>
      <HStack>
        <Box w="full">
          {!isLoggedIn && (
            <FormControl id="name" mb="10rem">
              <Input
                placeholder="Your name"
                _placeholder={{ color: "gray.500" }}
                type="message"
                color="black"
                ref={revName}
                maxLength={20} // Add maxLength attribute
                name="name"
                _dark={{ color: "white" }}
              />
            </FormControl>
          )}

          <FormControl id="message">
            <Textarea
              placeholder="Write your review"
              _placeholder={{ color: "gray.500" }}
              type="message"
              color="black"
              ref={revText}
              _dark={{ color: "white" }}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 200) {
                  revText.current.value = value; // Update the textarea value
                  setCharacterCount(value.length); // Update the character count
                }
              }}
              maxLength={200} // Set the maximum length to 200
            />
            <Text
              fontSize="sm"
              color="gray.500"
              _dark={{
                color: "white",
              }}
              mt="10rem"
            >
              {characterCount}/200
            </Text>
          </FormControl>
        </Box>
        <Stack spacing={6}>
          <Button
            bg={"gold"}
            color={"black"}
            w="120rem"
            h={isLoggedIn ? "90rem" : "135rem"}
            mt="-10rem"
            ml="10rem"
            rounded="20rem"
            // alignSelf="center"
            _hover={{
              bg: "gold",
              transform: "scale(1.05)",
              background: "#000",
              color: "#fff",
              border: "1rem solid gold",
            }}
            onClick={handleSubmit}
            disabled={characterCount > 200}
            _dark={{
              color: "black",
              bg: "white",
              _hover: { border: "black 1rem" },
            }}
          >
            Submit
          </Button>
        </Stack>{" "}
      </HStack>
    </Stack>
  );
};

export default connect(mapStateToProps)(ReviewForm);
