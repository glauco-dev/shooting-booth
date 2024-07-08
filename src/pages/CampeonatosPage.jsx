import React from "react";
import Manager from "../Manager";
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Divider, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default () => {
    const [campeonatos, setCampeonatos] = React.useState(Manager.state['campeonatos'] || []);
    Manager.subscribe('campeonatos', (data) => {
        console.log(campeonatos, data)
        setCampeonatos(data);
    });
    console.log(campeonatos)
    return <>
        <h1>Campeonatos</h1>
        <Accordion>
        { campeonatos.map(campeonato => 
                <Campeonato key={campeonato.id} campeonato={campeonato} />
        )}
        </Accordion>
        {/* sequencia de campeonatos*/}
    </>
}

const Campeonato = ({campeonato}) => {
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
                    <TableCaption>Squads do campeonato: {campeonato.nome}</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Pista</Th>
                            <Th>Localização</Th>
                            <Th>Nº Alvos</Th>
                            <Th>Squads participando</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {campeonato.pistas.map(pista =>
                            <Tr key={pista.id}
                                // Levar para a pagina de pista
                                // onClick={() => setShowPista(pista)}
                                >
                                <Td>{pista.nome}</Td>
                                <Td>{pista.localizacao}</Td>
                                <Td>{pista.alvos.length} Alvos</Td>
                                <Td>{pista.squads.length} Squads</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </AccordionPanel>
    </AccordionItem>
}