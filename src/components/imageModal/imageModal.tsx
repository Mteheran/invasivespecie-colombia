import { CloseIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  IconButton,
  Center,
  Image
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  url: string;
  setIsModalOpen: any
}

function InvasiveSpecieModal(props: Props) {
  const { isOpen, url, setIsModalOpen } = props;

  const [dimensions, setDimensions] = useState({ 
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

  const imageHeight = dimensions.height * 0.9;
  const imageWidth = dimensions.width * 0.9;

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
          height="100%"
          width="100%"
          bg='transparent'
          boxShadow='none'
        >
        <ModalBody height="100%" maxWidth="100%" p='0px'>
          <Center height="100%" width="100%">
            <Image 
              src={url} 
              alt="Imagen de la especie invasora"
              objectFit='contain'
              height={`${imageHeight}px`}
              width={`${imageWidth}px`}
            />
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