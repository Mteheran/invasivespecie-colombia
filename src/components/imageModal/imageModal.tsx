import { CloseIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  IconButton,
  Center
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  url: string;
  setIsModalOpen: any
}

function InvasiveSpecieModal(props: Props) {
  const { isOpen, url, setIsModalOpen } = props;

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
          maxHeight="80vh"
          minWidth="xl"
          bg='transparent'
          boxShadow='none'
        >
        <ModalBody >
          <Center>
            <img src={url} alt="Imagen de la especie invasora"/>
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