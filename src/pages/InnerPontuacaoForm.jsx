import React from "react";
import { TiposPontos } from "../Models";
import { Box, Button, FormControl, FormLabel, TabPanel, Input, Divider } from "@chakra-ui/react";

export default ({ alvoDePista, ordemN, setAlvoFillMethod }) => {
    const MAXUse = alvoDePista.pontos.length
    const isAlvoBoolean = typeof alvoDePista.pontos == 'boolean';

    const [used, setFlag] = React.useState(0);
    const [state, setState] = React.useState(isAlvoBoolean? false : alvoDePista.pontos);
    const ConfirmPontuacao = () => {
        console.log(state);
        setAlvoFillMethod(state);
    }
  return (
      <><FormControl>

          <Box display={"grid"} gridTemplateAreas={"'a c d'"} gap={2}>
              {/* Transformar os alvos da pista em um form de ação única cada */}
              {isAlvoBoolean ?
                  <Button onClick={(env) => {
                    let innerState = {alreadyClicked, }
                      setState(!alreadyClicked);
                      alreadyClicked ? setFlag(used - 1) : setFlag(used + 1);
                      set(true);
                      setTimeout(() => set(false), 400);
                  } }>No Shoot</Button>
                  : Object.keys(TiposPontos).map((hit, index) => {
                      const [alreadyClicked, set] = React.useState(false); // controlador de double click
                      return (
                          <Button
                              height={"40px"}
                              key={"addPts" + index + alvoDePista.icone + ordemN}
                              isDisabled={used >= MAXUse}
                              onClick={(env) => {
                                  console.log(alreadyClicked, hit, TiposPontos[hit]);
                                  setState(
                                      TiposPontos[hit] * (alreadyClicked ? -1 : 1)
                                  );
                                  alreadyClicked ? setFlag(used + 1) : setFlag(used - 1);
                                  set(true);
                                  setTimeout(() => set(false), 400);
                              } }
                          >
                              {hit}
                          </Button>
                      );
                  })}
          </Box>
          <Divider/>
          <Button mt={2} onClick={ConfirmPontuacao}>
              Confirmar
          </Button>
          <FormLabel>Extras</FormLabel>
          <Box display={"grid"} gap={2}>
              <Button>Procs</Button>
              <Button>Decays</Button>
          </Box>
      </FormControl></>
  );
};

