import React from 'react';
import { HamburgerIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Img, Input, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure, WrapItem } from "@chakra-ui/react";

export default ({userInfo, logout}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    
    return(
        <><Button position={"sticky"} top={0} marginLeft={"auto"} zIndex={100} ref={btnRef} bg="transparent" right={0} onClick={onOpen}>
            <HamburgerIcon />
        </Button><Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                    <WrapItem>
                        <Avatar name={userInfo.foto} src='https://bit.ly/dan-abramov' />
                    </WrapItem>
                    </DrawerHeader>

                    <DrawerBody>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={logout}>
                            Deslogar
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer></>
    )
}