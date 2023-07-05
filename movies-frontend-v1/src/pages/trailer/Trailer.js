import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box } from "@chakra-ui/react";

const Trailer = () => {
  const params = useParams();
  const key = params.ytTrailerId;

  return (
    <Box>
      {key != null}
      <ReactPlayer
        controls="true"
        playing={true}
        url={`https://www.youtube.com/watch?v=${key}`}
        width="100%"
        height="600rem"
      />
    </Box>
  );
};

export default Trailer;
