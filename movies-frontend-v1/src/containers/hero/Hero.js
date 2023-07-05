import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Image,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import Carousel from "../../components/carousel/Carousel";

const Hero = ({ movies }) => {
  return (
    <>
      <Carousel movies={movies} />
    </>
  );
};

export default Hero;
