import React, { useRef } from "react";
import Manager from "../Manager";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import Pista from "./Pista";
import ControlBaseModal from "../components/ControlBaseModal";

export default () => {
    const [campeonatos, setCampeonatos] = React.useState(Manager.state['campeonatos'] || []);
    Manager.subscribe('campeonatos', (data) => setCampeonatos(data));
    return <>
        <h1>Campeonatos</h1>
        <Accordion>
        { campeonatos.map(campeonato => 
                <Campeonato key={campeonato.id} campeonato={campeonato} />
        )}
        </Accordion>
    </>
}

const Campeonato = ({campeonato}) => {
    const [showPista, setShowPista] = React.useState(null);

    return <AccordionItem>
        <h3>
            <AccordionButton>
                <Box as ="span" flex='1' textAlign='left'>{campeonato.nome}</Box>
            </AccordionButton>
        </h3>
        <AccordionPanel>
            <p>{campeonato.descricao}</p>
            <Divider/>
            <TableContainer>
                <Table variant="simple">
                    <TableCaption>Pistas do campeonato: {campeonato.nome}</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Pista</Th>
                            <Th>Localização</Th>
                            <Th>Nº Alvos</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {campeonato.pistas.map(pistaId =>{
                            let pistaFound = Manager.state['pistas'].find(pista => pista.id === pistaId);
                            return pistaFound && <Tr key={pistaId}
                                // Levar para a pagina de pista
                                onClick={() => {setShowPista(pistaFound);}}
                                >
                                <Td>{pistaFound.nome}</Td>
                                <Td>{pistaFound.localizacao}</Td>
                                <Td>{pistaFound.alvos.length} Alvos</Td>
                            </Tr>
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </AccordionPanel>
        {showPista && <ControlBaseModal closeCallback={()=>setShowPista(null)}  InnerComponent={Pista} fontData={{pista: showPista}} /> }
    </AccordionItem>
}