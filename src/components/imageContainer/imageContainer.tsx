import { Skeleton, Image, IconButton, Tooltip, Box } from "@chakra-ui/react";
import { FC, useState } from "react";
import ImageModal from "../imageModal";
import { BsArrowsFullscreen } from "react-icons/bs";
import { useT } from "../../i18n/lang";

interface ImageContainerProps {
  imgURL?: string;
  imgAlt?: string;
  aspectRatio?: number;
  rounded?: boolean;
  showExpand?: boolean;
}

const ImageContainer: FC<ImageContainerProps> = ({
  imgURL,
  imgAlt,
  aspectRatio = 4 / 3,
  rounded = true,
  showExpand = true,
}) => {
  const t = useT();
  const [imageReady, setImageReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoad = () => {
    setTimeout(() => setImageReady(true), 200);
  };

  const radius = rounded ? '15px 15px 0 0' : '0';

  return (
    <>
      <Skeleton
        isLoaded={imageReady}
        minWidth="100%"
        aspectRatio={aspectRatio}
        position="relative"
        overflow="hidden"
      >
        <Image
          objectFit="cover"
          src={imgURL ?? ""}
          alt={imgAlt ?? ""}
          onLoad={handleLoad}
          onClick={() => setIsModalOpen(true)}
          width="100%"
          height="100%"
          style={{ cursor: 'pointer', borderRadius: radius }}
        />
        {showExpand && (
          <Tooltip label={t.card.expand}>
            <IconButton
              aria-label={t.card.expand}
              color="white"
              rounded="full"
              size="sm"
              position="absolute"
              bottom="12px"
              right="12px"
              boxSize="36px"
              icon={<BsArrowsFullscreen />}
              onClick={() => setIsModalOpen(true)}
              variant="solid"
              background="rgba(30,32,23,.66)"
              _hover={{ background: 'brand.500' }}
            />
          </Tooltip>
        )}
        {!imgURL && <Box position="absolute" inset={0} bg="brand.100" />}
      </Skeleton>
      <ImageModal isOpen={isModalOpen} url={imgURL ?? ""} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default ImageContainer;
