// Página de pontuação de cada membro indivualmente
import React, { useEffect, useRef, useState } from 'react';
import { FormControl, FormLabel, Input, FormHelperText, Button, Box, Badge } from '@chakra-ui/react';
import Manager from '../Manager';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { AlvosTipos } from '../Models';

export default ({membro, pista, squad}) => {
    const ConfirmPontuacao = async () => {
        let {procs, decays, tempo} = membroPontuacao;
        let pontos = Object.keys(AlvosTipos).reduce((a, b) => a + (membroPontuacao[b]*AlvosTipos[b]), 0);
        setDoc(doc(Manager.db, 'pontuação', pontuacaoRef.id), {
            membro: membro.id,
            squad: squad.id,
            pista: pista.id,
            procs,
            decays,
            tempo,
            pontos,
            hitfactor: pontos/tempo,
            id:pontuacaoRef.id
        });
    };
    let pontuacaoRef = doc(collection( Manager.db, 'pontuação')) ;

    const [membroPontuacao, setMembrosPontuacao] = React.useState(
        Object.keys(AlvosTipos).reduce((a, b) => ({...a, [b]: 0}), {
            tempo: 0,
            misses: 0,
            decays: 0,
        }),
    );
    
    return  membroPontuacao && <>
            <FormControl>
                <FormLabel>Alvos</FormLabel>
                <Box display={'grid'} gridTemplateAreas={"'a c d'"} gap={2}>
                    {Object.keys(AlvosTipos).map(key => {
                    const [alreadyClicked, set] = useState(false)
                        return <Button height={'40px'} key={'addPts'+key} 
                                onClick={ (env) => {
                                    alreadyClicked? 
                                        setMembrosPontuacao({...membroPontuacao, [key]: membroPontuacao[key] - 1})
                                    :   setMembrosPontuacao({...membroPontuacao, [key]: membroPontuacao[key] + 1})
                                    set(true);
                                    setTimeout(() => set(false), 400);
                                    }
                                }
                                > 
                                {key}
                                {membroPontuacao[key]>0 && <Badge colorScheme='green'>
                                    {/* {membroPontuacao[key]}/
                                    {pista.alvos.reduce(
                                        (a, b) => a + b.pontos.filter(p => p === key).length, 
                                    ) } */}
                                </Badge>}
                        </Button>
                    })}
                </Box>
                <FormLabel>Extras</FormLabel>
                <Box display={'grid'} gap={2}>
                    <Button>
                        Procs
                    </Button>
                    <Button>
                        Decays
                    </Button>
                </Box>
            </FormControl>
            <Button onClick={ConfirmPontuacao}>Confirmar</Button>
        </>

  
}
