import { Skeleton, Image, IconButton, Tooltip  } from "@chakra-ui/react";
import { FC, useState } from "react";
import ImageModal from "../imageModal";
import { BsArrowsFullscreen } from "react-icons/bs";

const ImageContainer: FC<{ imgURL?: string, imgAlt?: string }> = ({ imgURL, imgAlt }) => {

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
              src={imgURL ?? ""}
              alt={imgAlt ?? ""}
              onLoad={handleLoad}
              onClick={() => { setIsModalOpen(true); }}
              width="100%"
              height="100%"
              style={{ cursor: 'pointer', borderRadius: '15px 15px 0 0' }}
          />
          <Tooltip label='Expandir imagen'>
            <IconButton
              aria-label='Expandir imagen'
              color={"white"}
              rounded={"full"}
              position={'absolute'}
              bottom='1rem'
              right='1rem'
              icon={<BsArrowsFullscreen />}
              onClick={()=> setIsModalOpen(true)}
              variant={"solid"}
              background={"blackAlpha.700"}
              sx={{
                '&:hover': {
                  background:'#b8c1ac'
                }}
              }
            />
          </Tooltip>
        </Skeleton>
        <ImageModal isOpen={isModalOpen} url={imgURL ?? ""} setIsModalOpen={setIsModalOpen}/>
    </>
  );
}


export default ImageContainer;