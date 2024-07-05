import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
export default () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <Box>
            <Button ref={btnRef} bg="transparent" right={0} onClick={onOpen}>
                <HamburgerIcon />
            </Button>
        </Box>
    );
}