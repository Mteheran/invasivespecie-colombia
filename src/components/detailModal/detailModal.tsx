import { Button, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Badge, Spinner, Text, Box, Heading } from "@chakra-ui/react";
import { IInvasiveSpecie } from "../../services/invasiveSpecie";
import ImageContainer from "../imageContainer";
import ShareModal from "../shareModal";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  data: IInvasiveSpecie;
  setIsModalOpen: any
}

const GetRiskLevelLabel = (riskLevel: number)=> {
  switch (riskLevel) {
    case 0:
      return <Badge width='fit-content'>Riesgo Bajo</Badge>
    case 1:
      return <Badge colorScheme='orange' width='fit-content'>Riesgo Medio</Badge>
    case 2:
      return <Badge colorScheme='red' width='fit-content'>Riesgo Alto</Badge>
    default:
      return "";
  }
}

function InvasiveSpecieModal(props: Props) {
  const { isOpen, data, setIsModalOpen } = props;
  const [ isShareModalOpen, setIsShareModalOpen ] = useState(false);

  const openModalShare = () => {
    setIsShareModalOpen(true);
  }

  const shareUrl = (new URL(document.URL).origin) + "/?id=" + data.id;
  const Loader = () => isOpen ? <Spinner /> : <></>

  return (
    data?.id > 0 ? 
    <Modal isOpen={isOpen} onClose={() => {setIsModalOpen(false)}} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent borderRadius='25px' bg='transparent'>
        <ModalCloseButton zIndex={5000} color='white' bg='#6d7862' boxShadow='0px 4px 11px 1px gray'/>
        <ModalBody p='0'>
          <ImageContainer imgURL={data.urlImage} imgAlt={data.name}/>
          <Box bg='#feeee4' p='15px'  color='#1e2017'>
            <Box display='flex' justifyContent='space-between' mb='20px'>
              <Box display='flex' flexDirection='column'>
                <Heading fontFamily='cursive' fontSize='35px' mb='2px'>{data.name}</Heading>
                <Heading as='h3' fontSize='18px' mb='6px'>{data.scientificName}</Heading>
                {GetRiskLevelLabel(data.riskLevel)}
              </Box>
              <Button variant='default' onClick={()=> openModalShare()} >Compartir </Button>
            </Box>
            <Box display='flex' justifyContent='space-between' flexWrap='wrap'>
              <Box width='100%' mb='8px' pb='8px' borderBottom='solid 1px #1e2017'>
                <Heading as='h2' fontSize='22px' fontFamily='sans-serif'>Nombres comunes</Heading>
                <Text fontFamily='serif'>{data.commonNames}</Text>
              </Box>
              <Box width='100%' mb='15px' pb='8px' borderBottom='solid 1px #1e2017'>
                <Heading as='h2' fontSize='22px' fontFamily='sans-serif'>Impacto</Heading>
                <Text fontFamily='serif'>{data.impact}</Text>
              </Box>
              <Box width='100%' mb='15px' pb='8px'>
                <Heading as='h2' fontSize='22px' fontFamily='sans-serif'>Manejo</Heading>
                <Text fontFamily='serif'>{data.manage}</Text>
            </Box>
            </Box>
            {/** TODO: Change ShareModal into context component for avoiding component re-rendering */}
            <ShareModal speciesName={data.name} setIsModalOpen={setIsShareModalOpen} isOpen={isShareModalOpen} shareURL={shareUrl}/>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
    : <Loader />
  );
}

export default InvasiveSpecieModal;