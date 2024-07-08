// Página de pontuação de cada membro indivualmente
import React, { useEffect } from 'react';
import { FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react';
import Manager from '../Manager';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useLongPress } from 'use-long-press';
import { AlvosTipos } from '../Models';

export default ({membro, pista, squad}) => {
    const ConfirmPontuacao = (pontuacao) => () => setDoc(doc(Manager.db, 'pontuação', pontuacao.id), {...pontuacao,});
    const [membroPontuacao, setMembrosPontuacao] = React.useState(null);
    
    useEffect (async () =>
        setMembrosPontuacao(await PontcaoModelFac({membro, pista, squad}))
    , []);
    
    return  membroPontuacao && <>
            <FormControl>
                <FormLabel>Alvos</FormLabel>
                {PontuacaoAlvosBtnsFac((pontuacao) => () => null
                    // adicionar a pontuação no  estado do componente
                    // setDoc(doc(Manager.db, 'pontuação', membroPontuacao.id), pontuacao)
                )}
                <FormLabel>Extras</FormLabel>
            </FormControl>
            <Button onClick={ConfirmPontuacao(membroPontuacao)}>Confirmar</Button>
        </>

  
}

const PontuacaoAlvosBtnsFac = (handlePont) => {
    Object.keys(AlvosTipos).map(key => {
        return <Button key={key} 
            {... useLongPress(() => handlePont(AlvosTipos[key]* -1))()} 
            onClick={() => handlePont(AlvosTipos[key])}>{key}</Button>
    })
}
const PontcaoModelFac = async ({membro, pista, squad}) => {
    let base = {
        membro: membro.id,
        squad: squad.id,
        pista: pista.id,
        decays: 0,
        hitfactor: 0,
        pontos: 0,
        procs: 0,
        tempo: 0,
    }
    let pontuacaoRef = doc(collection( Manager.db, 'pontuação')) ;
    base = {...base, id: pontuacaoRef.id};
    await setDoc(pontuacaoRef, base);
    return base;
}
