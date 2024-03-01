import { FaWhatsapp, FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ButtonGroup,
  IconButton,
  Center,
  Button,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
  isOpen: boolean;
  shareURL: string;
  setIsModalOpen: any,
  speciesName: string | undefined;
}

function ShareModal(props: Props){
    const { isOpen, shareURL, setIsModalOpen, speciesName } = props;
    
    const textToShare = useMemo(() => {
        return `Mira a la especie invasora ${speciesName} en: ${shareURL}`;
    }, [shareURL, speciesName])

    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    };

    return(
        <Modal 
            isOpen={isOpen} 
            onClose={() => setIsModalOpen(false)}
            size='xl'
            isCentered
        >
            <ModalOverlay />
        <ModalContent>
          <ModalHeader>Compartir en:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center m={"1rem"}>
                <ButtonGroup flexDirection={"row"}>
                    <IconButton 
                        size={"lg"}
                        isRound={true} 
                        aria-label='Share in WhatsApp' 
                        colorScheme="whatsapp"
                        variant={"solid"}
                        icon={<FaWhatsapp size={30}/> }
                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(textToShare)}`, '_blank')}
                    />
                    <IconButton 
                        size={"lg"}
                        isRound={true} 
                        aria-label='Share in WhatsApp' 
                        colorScheme="facebook"
                        variant={"solid"}
                        icon={<FaFacebookF size={30}/>}
                        onClick={() => window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareURL)}`, '_blank')}
                    />
                    <IconButton 
                        size={"lg"}
                        isRound={true} 
                        aria-label='Share in WhatsApp' 
                        colorScheme="gray"
                        variant={"solid"}
                        icon={<FaXTwitter  size={30}/>}
                        onClick={() => window.open(`https://twitter.com/share?url=${encodeURIComponent(textToShare)}`, '_blank')}
                    />
                    <IconButton 
                        size={"lg"}
                        isRound={true} 
                        aria-label='Share in linkedin' 
                        colorScheme="blue"
                        variant={"solid"}
                        icon={<FaLinkedinIn  size={30}/>}
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}"`, '_blank')}
                    />
                </ButtonGroup>
            </Center>
            <Center m={"1rem"}>
                <HStack spacing={4} width="100%">
                    <Input value={textToShare} isReadOnly/>
                    {!isMobileDevice() && <Button onClick={async () => await navigator.clipboard.writeText(textToShare)}>Copy</Button>}
                </HStack>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
}

export default ShareModal;