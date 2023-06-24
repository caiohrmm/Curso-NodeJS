import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { Context } from "../../context/UserContext";
import { useContext } from "react";

const ModalComponent = ({ isOpen, onOpen, onClose }) => {
  const { logout } = useContext(Context);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tem certeza que deseja sair ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button
              textColor="white"
              backgroundColor="red.500"
              colorScheme="orange"
              onClick={logout}
            >
              Sair
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;
