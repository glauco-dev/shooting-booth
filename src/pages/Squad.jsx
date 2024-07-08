// Lista os membros do squad e a pista que ela está correndo
// Clicar no membro abre tela de pontuacao

import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, List } from '@chakra-ui/react';
import Manager from '../Manager';
import PontuacaoDeMembro from './Pontuacao';

export default ({pista,squad}) => {
    let membros = squad.membros.map(membroId => Manager.state['membros'].find(membro => membroId === membro.id));
    console.log(membros)
    return <Tabs>
    <TabList>
        <Tab>Detalhes</Tab>
        {Manager.state['user'].id === squad.capitao && membros.map(membro => {
            return <Tab key={membro.id+"tabUser"}>{membro.nome}</Tab>
        })}
    </TabList>
  
    <TabPanels>
      <TabPanel>
        <List>
            <li>Nome: {squad.nome}</li>
            <li>Pista: {pista.nome}</li>
        </List>
      </TabPanel>
        {membros.map(membro => {
          console.log('Member rendering tabpanel called',membro);
          return <TabPanel key={membro.id+"tabPanel"}>
              <PontuacaoDeMembro  pista={pista} squad={squad} membro={membro} />)
          </TabPanel>
        })}
    </TabPanels>
  </Tabs>
}