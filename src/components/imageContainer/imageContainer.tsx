import { Skeleton, Image, IconButton, Tooltip  } from "@chakra-ui/react";
import { useState } from "react";
import ImageModal from "../imageModal";
import { BsArrowsFullscreen } from "react-icons/bs";

function ImageContainer(props: { imgURL?: string, imgAlt?: string }) {
  const { imgURL, imgAlt } = props;

  const [imageReady, setImageReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoad = () => {
    setTimeout(() => {
      setImageReady(true);
    }, 200);
  }

  return (
    <>
      <Skeleton
            isLoaded={imageReady}
            minWidth='100%'
            aspectRatio={4/3}
            style={{overflow: 'hidden'}}
            position={'relative'}
        >
          <Image
              objectFit='cover'
              src={imgURL? imgURL : ""}
              alt={imgAlt? imgAlt : ""}
              onLoad={handleLoad}
              onClick={() => { setIsModalOpen(true); }}
              width="100%"
              height="100%"
              style={{ cursor: 'pointer' }} // Add this line
          />
          <Tooltip label='Expandir imagen'>
            <IconButton aria-label='Expandir imagen' 
              position={'absolute'}
              bottom='1rem'
              right='1rem'
              icon={<BsArrowsFullscreen />}
              onClick={()=> setIsModalOpen(true)} 
              variant={"solid"}
              background={"blackAlpha.700"}
            />
          </Tooltip>
        </Skeleton>
        <ImageModal isOpen={isModalOpen} url={imgURL ? imgURL : ""} setIsModalOpen={setIsModalOpen}/>
    </>
  );
}


export default ImageContainer;