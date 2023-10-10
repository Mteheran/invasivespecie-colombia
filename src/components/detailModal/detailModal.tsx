import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, 
  ModalCloseButton, Badge, Spinner, Text } from "@chakra-ui/react";
import { IInvasiveSpecie } from "../../services/invasiveSpecie";
import ImageContainer from "../imageContainer";

interface Props {
  isOpen: boolean;
  data: IInvasiveSpecie;
  setIsModalOpen: any
}

function InvasiveSpecieModal(props: Props) {
  const { isOpen, data, setIsModalOpen } = props;

  const GetRiskLevelLabel = (riskLevel: number)=> {
    switch (riskLevel) {
      case 0:
        return <Badge>Bajo</Badge>
      case 1:
        return <Badge colorScheme='orange'>Medio</Badge>
      case 2:
        return <Badge colorScheme='red'>Alto</Badge>
      default:
        return "";
    }
  }

  return (
    data?.id > 0 ? 
    <Modal isOpen={isOpen} onClose={() => {setIsModalOpen(false)}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ImageContainer imgURL={data.urlImage} imgAlt={data.name}/>
          <Text as='b'>Nivel de riesgo:</Text><p> {GetRiskLevelLabel(data.riskLevel)}</p>
          <Text as='b'>Nombre científico:</Text><p> {data.scientificName}</p>
          <Text as='b'>Nombres comunes:</Text><p> {data.commonNames}</p>
          <Text as='b'>Impacto:</Text><p> {data.impact}</p>
          <Text as='b'>Manejo:</Text><p> {data.manage}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
    : isOpen ? <Spinner /> : <></>
  );
}

export default InvasiveSpecieModal;