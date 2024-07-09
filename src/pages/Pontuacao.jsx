// Página de pontuação de cada membro indivualmente
import React, { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Box,
  Badge,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  Icon,
} from "@chakra-ui/react";
import Manager from "../Manager";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { AlvosTipos, TiposPontos } from "../Models";
import InnerPontuacaoForm from "./InnerPontuacaoForm";

export default ({ membro, pista, squad }) => {
  const ConfirmPontuacao = async () => {
    let { procs, decays, tempo } = membroPontuacao;
    let pontos = Object.keys(TiposPontos).reduce(
      (a, b) => a + membroPontuacao[b] * TiposPontos[b],
      0
    );
    setDoc(doc(Manager.db, "pontuação", pontuacaoRef.id), {
      membro: membro.id,
      squad: squad.id,
      pista: pista.id,
      procs,
      decays,
      tempo,
      pontos,
      hitfactor: pontos / tempo,
      id: pontuacaoRef.id,
    });
  };
  let pontuacaoRef = doc(collection(Manager.db, "pontuação"));

  const [membroPontuacao, setMembrosPontuacao] = React.useState(
    Object.keys(TiposPontos).reduce((a, b) => ({ ...a, [b]: 0 }), {
      tempo: 0,
      misses: 0,
      decays: 0,
    })
  );

  const [alvosAPontuar, setAlvosPontos] = React.useState(
    pista.alvos.map((alvo) => {
      return { ...alvo, pontos: AlvosTipos[alvo.type] };
    })
  );

  const [alvoIndex, setAlvoIndex] = React.useState(0);
  const filledStatePassingCallback = (indexOfAlvo) => (stateChange) => {
    console.log(indexOfAlvo);
    let aux = alvosAPontuar;
    aux[indexOfAlvo].pontos = stateChange;
    console.log(aux, alvosAPontuar);
    setAlvosPontos([...aux]);
  };

  return (
    membroPontuacao && (
      <>
        <Tabs display={"flex"}>
          {alvosAPontuar.map((alvo, alvoIndex) => {
            var counter = 0;
            console.log(alvo.pontos);
            return (
              <Tab
                tabIndex={alvoIndex}
                key={"tabAlvo" + alvo.icone}
              >
                <Badge colorScheme={"blue"}>
                  <Icon as={alvo.icone} />
                  <small>
                    {Array.isArray(alvo)
                      ? alvo.pontos.reduce((a, b) => a + b, 0)
                      : alvo.pontos}
                  </small>
                </Badge>
              </Tab>
            );
          })}
        </Tabs>

        <TabPanels>
          {alvosAPontuar.map((alvo, index) => (
            <TabPanel tabIndex={index} mt={2} key={"tabAlvo" + alvo.icone}>
              <Box mb ={2}>
                <FormLabel>Tempo</FormLabel>
                <Input
                  onChange={(e) =>
                    setMembrosPontuacao({
                      ...membroPontuacao,
                      tempo: e.target.value,
                    })
                  }
                  type="number"
                  value={membroPontuacao["tempo"]}
                />
              </Box>
              <InnerPontuacaoForm
                alvoDePista={alvo}
                key={"tabAlvo" + alvo.icone + index}
                ordemN={index}
                setAlvoFillMethod={filledStatePassingCallback(index)}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </>
    )
  );
};
