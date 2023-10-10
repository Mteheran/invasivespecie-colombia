import { Skeleton, Image, IconButton, 
  Flex, Box, Tooltip  } from "@chakra-ui/react";
import { useState } from "react";
import ImageModal from "../imageModal";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function ImageContainer(props: { imgURL?: string, imgAlt?: string }) {
  const { imgURL, imgAlt } = props;

  const [imageReady, setImageReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoad = () => {
    setTimeout(() => {
      setImageReady(true);
    }, 2000);
  }

  return (
    <>
      <Skeleton
            boxSize='300px'
            borderRadius='lg'
            isLoaded={imageReady}
        >
          <Flex color='white'>
          <Box>
          <Image
              boxSize='300px'
              objectFit='cover'
              src={imgURL? imgURL : ""}
              alt={imgAlt? imgAlt : ""}
              borderRadius='lg'
              onLoad={handleLoad}
              onClick={() => {
                console.log("image clicked");
                setIsModalOpen(true);
              }}
          />
          </Box>
          <Box>
          <Tooltip label='Expandir imagen'>
            <IconButton aria-label='Expandir imagen' 
            marginLeft={2}
            icon={<ExternalLinkIcon />}
            onClick={()=> setIsModalOpen(true)} />
          </Tooltip>
          </Box>
          </Flex>
        </Skeleton>
        <ImageModal isOpen={isModalOpen} url={imgURL ? imgURL : ""} setIsModalOpen={setIsModalOpen}/>
    </>
  );
}


export default ImageContainer;