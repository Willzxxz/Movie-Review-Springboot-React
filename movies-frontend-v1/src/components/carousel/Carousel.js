import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Carousel = ({ movies }) => {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const goToPrevSlide = () => {
    if (!isTransitioning) {
      const totalSlides = movies.length;
      let prevSlide = currentSlide - 1;

      if (prevSlide < 0) {
        prevSlide = totalSlides - 1; // Loop back to the last slide
      }

      setIsTransitioning(true);
      carouselRef.current.slickPrev();
      setCurrentSlide(prevSlide);
    }
  };

  const goToNextSlide = () => {
    if (!isTransitioning) {
      const totalSlides = movies.length;
      let nextSlide = currentSlide + 1;

      if (nextSlide >= totalSlides) {
        nextSlide = 0; // Loop back to the first slide
      }

      setIsTransitioning(true);
      carouselRef.current.slickNext();
      setCurrentSlide(nextSlide);
    }
  };

  const goToSlide = (index) => {
    carouselRef.current.slickGoTo(index);
    setCurrentSlide(index);
  };

  const CustomDots = ({ active }) => (
    <HStack spacing="10rem" h="50rem" w="fit-content">
      {movies?.map((_, index) => (
        <Box
          key={index}
          w="10rem"
          h="10rem"
          borderRadius="50%"
          bg={active === index ? "gold" : "gray.400"}
          _dark={{
            bg: active === index ? "white" : "gray.600",
          }}
          cursor="pointer"
          onClick={() => goToSlide(index)}
        />
      ))}
    </HStack>
  );

  return (
    <Box height="500rem">
      <Slider
        {...settings}
        ref={carouselRef}
        beforeChange={() => setIsTransitioning(true)}
        afterChange={(slide) => {
          setCurrentSlide(slide);
          setIsTransitioning(false);
        }}
      >
        {movies?.map((movie, index) => (
          <Box key={movie.imdbId}>
            <VStack width="100%" height="600rem" overflow="hidden">
              <Box
                width="100vw"
                height="600rem"
                bgImage={movie.backdrops[0]}
                bgPosition="top"
                bgSize="cover"
                position="relative"
              >
                <Box
                  position="absolute"
                  width="100%"
                  height="600rem"
                  bgGradient="linear(transparent 0%, hsla(1, 100%, 0%, 0.18) 40%, black 100%)"
                />
                <Center mt="300rem">
                  <HStack
                    position="absolute"
                    w="800rem"
                    zIndex="2"
                    flex
                    justifyContent="space-between"
                  >
                    <Image
                      width="200rem"
                      rounded="10rem"
                      src={movie.poster}
                      alt={`Card ${index + 1}`}
                      border="solid gold 1rem"
                      _dark={{ border: "white solid 1rem" }}
                    />
                    <Box w="420rem" p="10rem" mt="0rem">
                      <VStack flex justifyContent="space-between" h="300rem">
                        <Box
                          h="fit-content"
                          w="fit-content"
                          p="0rem"
                          top="0rem"
                          bg="hsla(0, 0%, 0%, .03)"
                        >
                          <Text
                            fontSize="40rem"
                            textAlign="center"
                            w="fit-content"
                            textShadow=" 2prem 2rem hsla(0, 0%, 0%, .5);
                          "
                          >
                            {movie.title}
                          </Text>
                        </Box>
                        <HStack
                          mt="auto"
                          alignSelf="center"
                          flex
                          justifyContent="space-between"
                          w="100%"
                        >
                          <Link
                            to={`/Trailer/${movie.trailerLink.substring(
                              movie.trailerLink.length - 11
                            )}`}
                          >
                            <Button
                              display={{ m: "none", d: "inline-flex" }}
                              fontSize={"sm"}
                              fontWeight={600}
                              rounded="10rem"
                              color={"black"}
                              bg={"gold"}
                              w="180rem"
                              _dark={{
                                color: "gray.900",
                                bg: "white",
                                _hover: { border: "white solid 1rem" },
                              }}
                              _hover={{
                                bg: "gold",
                                transform: "scale(1.15)",
                                background: "#000",
                                color: "#fff",
                                border: "1rem solid gold",
                              }}
                            >
                              Play Trailer
                            </Button>
                          </Link>

                          <Button
                            display={{ m: "none", d: "inline-flex" }}
                            fontSize={"sm"}
                            fontWeight={600}
                            rounded="10rem"
                            color={"black"}
                            bg={"gold"}
                            w="180rem"
                            onClick={() => reviews(movie.imdbId)}
                            _dark={{
                              color: "gray.900",
                              bg: "white",
                              _hover: { border: "white solid 1rem" },
                            }}
                            _hover={{
                              bg: "gold",
                              transform: "scale(1.15)",
                              background: "#000",
                              color: "#fff",
                              border: "1rem solid gold",
                            }}
                          >
                            Reviews
                          </Button>
                        </HStack>
                      </VStack>
                    </Box>
                  </HStack>
                </Center>
              </Box>
            </VStack>
          </Box>
        ))}
      </Slider>
      <Center>
        <Box position="absolute" zIndex="5" mt="-100rem">
          <CustomDots active={currentSlide} />
        </Box>
      </Center>
      <Center mt="-350rem" px="10rem">
        <HStack flex justifyContent="space-between" w="100%">
          <Button
            onClick={goToPrevSlide}
            borderRadius="50%"
            bg="gold"
            h="50rem"
            w="50rem"
            _dark={{
              color: "white",
              bg: "gray.900",
              _hover: { border: "white solid 1rem" },
            }}
            _hover={{
              bg: "gold",
              transform: "scale(1.15)",
              background: "#000",
              color: "#fff",
              border: "1rem solid gold",
            }}
          >
            <FaChevronLeft size="20rem" />
          </Button>
          <Button
            onClick={goToNextSlide}
            borderRadius="50%"
            bg="gold"
            h="50rem"
            w="50rem"
            _dark={{
              color: "white",
              bg: "gray.900",
              _hover: { border: "white solid 1rem" },
            }}
            _hover={{
              bg: "gold",
              transform: "scale(1.15)",
              background: "#000",
              color: "#fff",
              border: "1rem solid gold",
            }}
          >
            <FaChevronRight size="20rem" />
          </Button>
        </HStack>
      </Center>
    </Box>
  );
};

export default Carousel;
