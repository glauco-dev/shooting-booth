import React from 'react';
import { HamburgerIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Avatar, Badge, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Img, Input, List, Stat, Switch, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure, WrapItem } from "@chakra-ui/react";
import Manager from './Manager';
import { onSnapshot, updateDoc, where } from 'firebase/firestore';

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
                        <Avatar name={userInfo.foto} src={userInfo.foto} />
                        <StatusBadge {...{userInfo}}></StatusBadge>
                    <FormControl alignSelf={'end'} display='flex' alignItems='center'>
                        <FormLabel htmlFor='email-alerts' mb='0'>
                            Notificações?
                        </FormLabel>
                        <Switch onChange={(env) => {
                            console.log(env)
                            // updateDoc(doc(Manager.db, 'membros', userInfo.id), {notificacoes: env.target.value});
                        }} id='email-alerts' />
                    </FormControl>
                    </WrapItem>
                    </DrawerHeader>

                    <DrawerBody>
                        {/* Aqui terá uma lista de contatos para enviar visualizar status e mandar mensagem
                            cada contato é um accordion para uma janela de mensagens em tempo real
                        */}
                            <Accordion allowToggle>
                                {
                                    userInfo.contatos.map(contatoId => {
                                        <ChatContact key={contatoId} membro ={userInfo} contatoId={contatoId}></ChatContact>
                                    })
                                }
                            </Accordion>
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

const ChatContact = ({membro, contatoId}) => {
    let contato = Manager.state['membros'].find(membro => membro.id === contatoId);
    const [membroMessages, setMembroMessages] = React.useState([]);
    const [contatoMessages, setContatoMessages] = React.useState([]);
    const [mensagemModel, setMensagemModel] = React.useState('');

    onSnapshot( query(collection(Manager.db, 'mensagens', where('who', '==', membro.id)), orderBy('data', 'asc')) , 
        (querySnapshot) => {
            console.log(querySnapshot.docs)
            // setMembroMessages(querySnapshot.docs.map(doc => doc.data()));
        }
    );
    // onSnapshot( query(collection(Manager.db, 'mensagens', where('who', '==', contatoId)), orderBy('data', 'asc')) , 
    //     (querySnapshot) => {
    //         setContatoMessages(querySnapshot.docs.map(doc => ({...doc.data(), time: doc.time()})));
    //     }
    // );
    
    return <AccordionItem>
        <AccordionButton>
            <Box flex='1' textAlign='right'>
                <Avatar name={contato.apelido} src={contato.foto} />
                <StatusBadge {...{userInfo: contato}}></StatusBadge>
            </Box>
        </AccordionButton>
        <AccordionPanel pb={4}>
            <List>
                {
                    
                }
            </List>
            <FormControl>
                <Input value={mensagemModel} placeholder='Mensagem...' />
                <Button
                    onClick={() => {
                        addDoc(collection(Manager.db, 'mensagens'), {
                            who: membro.id,
                            para: contatoId,
                            data: Date.now(),
                            mensagem: mensagemModel
                        })
                        setMensagemModel('');
                    }}
                >Enviar</Button>
            </FormControl>
        </AccordionPanel>                                            
    </AccordionItem>
}
const StatusBadge = ({userInfo}) => {
    return <Badge colorScheme={
        userInfo.status === 'online' ? 'green' 
    :   userInfo.status === 'offline' ? 'gray'
    :   userInfo.status === 'ocupado' ? 'red' : 'blue'}>{userInfo.status}</Badge>
}