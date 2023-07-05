import React, { useEffect, useRef, useState } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import ReviewForm from "../../components/reviewForm/ReviewForm";
import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";
import { connect, useSelector } from "react-redux";

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  username: state.auth.username, // Add username from the Redux store
});

const Reviews = ({
  getMovieData,
  movie,
  reviews = [],
  setReviews,
  isLoggedIn,
  username,
}) => {
  const revText = useRef();
  const revName = useRef();
  let params = useParams();
  const movieId = params.movieId;
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const { username: usernameAfterLogin } = useSelector((state) => state.user);
  // const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async () => {
    const rev = revText.current.value;
    const rav = isLoggedIn ? usernameAfterLogin : revName.current.value;

    const capitalizedName = rav
      ? rav
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")
      : "";

    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: rev,
        reviewName: capitalizedName,
        imdbId: movieId,
      });

      const updatedReviews = [...reviews, { body: rev, name: capitalizedName }];

      revText.current.value = "";
      {
        !isLoggedIn && (revName.current.value = "");
      }

      setReviews(updatedReviews);
    } catch (err) {
      console.log(err);
    }
  };

  const lastReviewIndex = currentPage * reviewsPerPage;
  const firstReviewIndex = lastReviewIndex - reviewsPerPage;
  const displayedReviews = [...reviews]
    .reverse()
    .slice(firstReviewIndex, lastReviewIndex);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Box bgGradient="linear(to-r, #ffe5b4	, #ccc2ba)">
        <HStack flex justifyContent="space-evenly">
          <Image
            width="300rem"
            rounded="10rem"
            my="100rem"
            src={movie?.poster}
            alt={`Card for ${movieId + 1}`}
            border="solid gold 1rem"
          />
          <Box>
            <Box
              color="black"
              w="600rem"
              h="fit-content"
              fontSize="16rem"
              mx="auto"
              display="flex"
              flexDirection="column"
              pt="10rem"
            >
              <Box flex="1">
                {displayedReviews.map((r, index) => (
                  <Box
                    key={index}
                    bg="white"
                    h="fit-content"
                    py="10rem"
                    borderBottom="solid 1rem"
                    rounded="10rem"
                    mb="5rem"
                    position="relative"
                  >
                    <HStack>
                      <Box mx="8rem" mb="auto">
                        <MdAccountCircle size="58rem" />
                      </Box>
                      <Box>
                        <Box
                          position="sticky"
                          top="0"
                          display="flex"
                          alignItems="flex-start"
                        >
                          <Text
                            fontSize="20rem"
                            pr="8rem"
                            mt="10rem"
                            wordBreak="break-word"
                          >
                            {r.name}:{" "}
                            <Text fontSize="16rem" as="span">
                              {r.body}
                            </Text>
                          </Text>
                        </Box>
                      </Box>
                    </HStack>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              mb="20rem"
              color="black"
              display="flex"
              justifyContent="center"
              flexDirection="row"
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <Box
                  key={index}
                  as="button"
                  px="2rem"
                  py="1rem"
                  mx="0.5rem"
                  fontWeight={currentPage === index + 1 ? "bold" : "normal"}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Box>
              ))}
            </Box>

            {isLoggedIn ? (
              <Center mb="20rem">
                <ReviewForm
                  handleFormSubmit={addReview}
                  revText={revText}
                  username={username} // Make sure to pass the username prop here
                  labelText="Write a review"
                />
              </Center>
            ) : (
              <Center mb="20rem">
                <ReviewForm
                  handleFormSubmit={addReview}
                  revText={revText}
                  revName={revName}
                  labelText="Write a review"
                />
              </Center>
            )}
          </Box>
        </HStack>
      </Box>
    </>
  );
};

export default connect(mapStateToProps)(Reviews);
