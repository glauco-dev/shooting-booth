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
                            <Th>Squad</Th>
                            <Th>Capitães</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {campeonato.squads.map(squad =>
                            <Tr key={squad.id}
                                // Levar para a pagina de pontuações
                                // onClick={() => setSquad(squad)}
                                >
                                <Td>{squad.nome}</Td>
                                <Td>{squad.capitao}</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </AccordionPanel>
    </AccordionItem>
}