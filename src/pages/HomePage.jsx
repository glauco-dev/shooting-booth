// Página inicial e tbm a que mostra os status do perfil, junto a sua foto e dados básicos

import React from "react";
import Manager from "../Manager";
import { Avatar, List, ListItem, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default () => {
    const [userInfo, setUserInfo] = React.useState(Manager.state['user']);

    return <>
        <Avatar rounded={"full"} w={'80'} h={'80'} name={userInfo.apelido} size={'lg'} mb={4} ml={"auto"} src={userInfo.foto} />
        <h1>Bem vindo, {userInfo.apelido}</h1>

        {/* table of info */}
        <List>
            <ListItem>Apelido: {userInfo.apelido}</ListItem>
            <ListItem>Email: {userInfo.email}</ListItem>   
            {/* <ListItem>Pontuação total: {Manager.state['pontuação'].map(pontuacao => pontuacao.pontos).reduce((a, b) => a + b, 0)}</ListItem> */}
        </List>
{/* 
        <Table>
            <Thead>
                <Tr>
                    <Th>Apelido</Th>
                    <Th>Email</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>{userInfo.apelido}</Td>
                    <Td>{userInfo.email}</Td>
                </Tr>
            </Tbody>
        </Table> */}
    </>
}