// Página de pontuação de cada membro indivualmente

import { FormControl, FormLabel, Input, FormHelperText } from '@chakra-ui/react';
import Manager from '../Manager';
import { addDoc, setDoc } from 'firebase/firestore';
import { useLongPress } from 'use-long-press';


export default ({membro, pista}) => {
    const ConfirmPontuacao = (pontuacao) => () => setDoc(doc(Manager.db, 'pontuação', pontuacao.id), {...pontuacao,});
    let membroPontuacao = PontcaoModelFac({membro, pista, squad});
    
    return  <>
            <FormControl>
                <FormLabel>Alvos</FormLabel>
                {PontuacaoAlvosBtnsFac((pontuacao) => setDoc(doc(Manager.db, 'pontuação', membroPontuacao.id), pontuacao))}
                <FormLabel>Extras</FormLabel>
            </FormControl>
            <Button onClick={ConfirmPontuacao(membroPontuacao)}>Confirmar</Button>
        </>

  
}

const PontuacaoAlvosBtnsFac = (handlePont) => {
    Object.keys(AlvosTipos).map(key => {
        return <Button key={key} 
            {... useLongPress(() => handlePont(AlvosTipos[key])* -1)()} 
            onClick={() => handlePont(AlvosTipos[key])}>{key}</Button>
    })
}
const PontcaoModelFac = async ({membro, pista, squad}) => {
    let pontuacaoRef = await addDoc(Manager.db, 'pontuação', {}) ;
    return ({
        id: pontuacaoRef.id,
        membro: membro.id,
        squad: squad.id,
        pista: pista.id,
        decays: 0,
        hitfactor: 0,
        pontos: 0,
        procs: 0,
        tempo: 0,
    })
}
