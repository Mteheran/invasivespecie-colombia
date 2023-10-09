import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, 
  ModalCloseButton, Badge, Spinner  } from "@chakra-ui/react";
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
          <p>Nivel de riesgo: {GetRiskLevelLabel(data.riskLevel)}</p>
          <p>Nombre científico: {data.scientificName}</p>
          <p>Nombres comunes: {data.commonNames}</p>
          <p>Impacto: {data.impact}</p>
          <p>Manejo: {data.manage}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
    : isOpen ? <Spinner /> : <></>
  );
}

export default InvasiveSpecieModal;