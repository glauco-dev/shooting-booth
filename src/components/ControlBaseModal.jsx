import React, { useEffect } from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

export default ({closeCallback, fontData, InnerComponent}) =>{
    console.log(fontData)
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => onOpen, [])
    return <Modal isOpen={isOpen}
        onClose={()=>{closeCallback();onClose()}}  size={"full"}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{fontData.nome}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <InnerComponent {...fontData} />
            </ModalBody>
            </ModalContent>
        </Modal>
}