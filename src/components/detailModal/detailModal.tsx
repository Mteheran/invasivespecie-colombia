import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { IInvasiveSpecie } from "../../services/invasiveSpecie";

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
        return "Bajo"
      case 1:
        return "Medio"
      case 2:
        return "Alto"
      default:
        return "";
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => {setIsModalOpen(false)}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <img src={data.urlImage} alt="Imagen de la especie invasora" />
          <p>Nivel de riesgo: {GetRiskLevelLabel(data.riskLevel)}</p>
          <p>Nombre científico: {data.scientificName}</p>
          <p>Nombres comunes: {data.commonNames}</p>
          <p>Impacto: {data.impact}</p>
          <p>Manejo: {data.manage}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default InvasiveSpecieModal;