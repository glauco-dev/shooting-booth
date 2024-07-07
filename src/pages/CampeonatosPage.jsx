import React from "react";
import Manager from "../Manager";

export default () => {
    const [campeonatos, setCampeonatos] = React.useState(Manager.state['campeonatos'] || []);
    Manager.subscribe('campeonatos', (data) => {
        console.log(campeonatos, data)
        setCampeonatos(data);
    });
    console.log(campeonatos)
    return <>
        <h1>Campeonatos</h1>
        { campeonatos.map(campeonato => 
            <Campeonato key={campeonato.id} campeonato={campeonato} />
        )}
        {/* sequencia de campeonatos*/}
    </>
}

const Campeonato = ({campeonato}) => {
    return <h1>{campeonato.nome}</h1>
}