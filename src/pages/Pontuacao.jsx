// Página de pontuação de cada membro indivualmente
import React, { useEffect } from 'react';
import { FormControl, FormLabel, Input, FormHelperText, Button, Box } from '@chakra-ui/react';
import Manager from '../Manager';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useLongPress } from 'use-long-press';
import { AlvosTipos } from '../Models';

export default ({membro, pista, squad}) => {
    const ConfirmPontuacao = async () => {
        let {procs, decays, tempo} = membroPontuacao;
        let pontos = membroPontuacao.alfas + membroPontuacao.charlies + membroPontuacao.deltas - membroPontuacao.noShots;
        let result = await setDoc(doc(Manager.db, 'pontuação', pontuacaoRef.id), {
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
        console.log(result);
    };
    let pontuacaoRef = doc(collection( Manager.db, 'pontuação')) ;
    const [membroPontuacao, setMembrosPontuacao] = React.useState({
        tempo: 0,
        alfas: 0,
        charlies: 0,
        deltas: 0,
        noShots: 0,
        misses: 0,
        decays: 0,
        procs: 0,
    });
    const handleAlvoInc = (prop, incDecr) => () => setMembrosPontuacao({...membroPontuacao, [prop]: membroPontuacao[prop] + incDecr? -1 : 1})

    
    return  membroPontuacao && <>
            <FormControl>
                <FormLabel>Alvos</FormLabel>
                <Box display={'grid'} gap={2}>
                    {Object.keys(AlvosTipos).map(key => {
                        return <Button key={'addPts'+key} 
                            {... useLongPress(() => handleAlvoInc(AlvosTipos[key], true))()} 
                            onClick={handleAlvoInc(AlvosTipos[key], false)}>
                                {key}
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
