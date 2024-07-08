// Listar detalhes da pista e seus squads
import React from "react";
import { List, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import Manager from "../Manager"
import ControlBaseModal from "../components/ControlBaseModal";
import Squad from "./Squad";

// Clicar no item de squad da tabela abre a tela do squad 
export default ({pista}) => {
    const [activeSquad, setActiveSquad] = React.useState(null);
    return <>
        <h1>{pista.nome}</h1>
        <List>
            <li>Alvos: {pista.alvos.length}</li>
            <li>Localização: {pista.localizacao}</li>
        </List>
        <Table>
            <TableCaption>Squads da pista</TableCaption>
            <Thead>
                <Tr>
                    <Th>Squad</Th>
                    <Th>Membros</Th>
                </Tr>
            </Thead>
            <Tbody>
                {pista.squads.map(squadId =>{
                    let squad = Manager.state['squads'].find(squad => squad.id === squadId);
                    return squad && <Tr 
                    // clicar no item de squad da tabela abre a tela do squad
                    onClick={() => setActiveSquad(squad)}
                    key={squad.id+"PistaView"}>
                        <Td>{squad.nome}</Td>
                        <Td>{squad.membros.length}</Td>
                    </Tr>
                })}
            </Tbody>
        </Table>
        {activeSquad && <ControlBaseModal closeCallback={() => setActiveSquad(null)} fontData={{squad: activeSquad, pista: pista}} InnerComponent={Squad}/>}
    </>
}