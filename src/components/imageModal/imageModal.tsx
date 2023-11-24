import { CloseIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  IconButton,
  Center,
  Image,
  Box
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  url: string;
  setIsModalOpen: any
}

function InvasiveSpecieModal(props: Props) {
  const { isOpen, url, setIsModalOpen } = props;

  const [windowDimensions, setDimensions] = useState({ 
    height: window.innerHeight, 
    width: window.innerWidth 
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let imageHeight = windowDimensions.height * 0.9;
  let imageWidth = windowDimensions.width * 0.9;

  const [imageDimensions, setImageDimensions] = useState({
    height: 0,
    width: 0
  });
  useEffect(() => {
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setImageDimensions({
        width: img.width,
        height: img.height
      });
    };
  }, [url]);

  // Horizontally scaling
  const tempImageHeight = ( windowDimensions.width / imageDimensions.width ) * imageDimensions.height;
  // Checking if it fits inside the screen
  if (tempImageHeight <= windowDimensions.height) {
    imageHeight = tempImageHeight;
  } else {
    imageWidth = ( windowDimensions.height / imageDimensions.height ) * imageDimensions.width;
  }

  return (
    url?.length > 0 ? 
    <Modal 
      isOpen={isOpen} 
      onClose={() => {setIsModalOpen(false)}}
      size="full"
      isCentered
    >
      <ModalOverlay
        backdropFilter='blur(10px)'
      />
      <ModalContent 
          zIndex={9999}
          height="100%"
          width="100%"
          bg='transparent'
          boxShadow='none'
          onClick={() => setIsModalOpen(false)}
        >
        <ModalBody height="100%" maxWidth="100%" p='0px'>
          <Center height="100%" width="100%">
            <Box onClick={(event) => event.stopPropagation()}>
              <Image 
                src={url} 
                alt="Imagen de la especie invasora"
                objectFit='contain'
                height={`${imageHeight}px`}
                width={`${imageWidth}px`}
              />
            </Box>
          </Center>
        </ModalBody>
        <IconButton
          background={"blackAlpha.700"}
          border="none"
          borderRadius="50%"
          aria-label="Close modal"
          icon={<CloseIcon color='white'/>}
          position="fixed"
          top="1rem"
          right="1rem"
          onClick={() => {setIsModalOpen(false)}}
        />
      </ModalContent>
    </Modal>
    : isOpen ? <Spinner /> : <></>
  );
}

export default InvasiveSpecieModal;