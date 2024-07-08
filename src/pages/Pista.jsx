// Listar detalhes da pista e seus squads

import { List, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import Manager from "../Manager"

// Clicar no item de squad da tabela abre a tela do squad 
export default ({pista}) => {
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
                    // onClick={() => setActiveSquad(squad)}
                    key={squad.id}>
                        <Td>{squad.nome}</Td>
                        <Td>{squad.membros.length}</Td>
                    </Tr>
                })}
            </Tbody>
        </Table>
    </>
}