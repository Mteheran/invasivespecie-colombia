import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import IinvasiveSpecie from "../../interfaces/IinvasiveSpecie";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: IinvasiveSpecie;
}

function InvasiveSpecieModal(props: Props) {
  const { isOpen, onClose, data } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <img src={data.urlImage} alt="Imagen de la especie invasora" />
          <p>Nivel de riesgo: {data.riskLevel}</p>
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