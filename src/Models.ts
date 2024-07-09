export type Campeonato = {
    atletasRegistrados: number,
    banner?: string,
    categoria?: string,
    dataFim: Date,
    dataInicio: Date,
    descricao: string,
    id: string,
    localidade: string,
    nome: string,
    pistas: string[],
    squads: string[],
}

export type Pista = {
    id: string,
    nome: string,
    alvos: {
        icone: string,
        type: keyof typeof AlvosTipos,
    }[],
    localizacao: string,
    membrosIncluidos: string[],
}

export const AlvosTipos = {
    // estrutura de exemplo para os tipos de alvos e seus conteúdos
    "Static": [0, 0], // pontos possíveis de alvos staticos
    "Plate": false,
    "No Shoot": false, // se acertou o no shoot ou não
    "Bailarina": [0, 0], // pontos possíveis de bailarina
}

export const TiposPontos = {
    "Alpha": 10,
    "Charlie": 5,
    "Delta": 1,
    "No Shoot": -10,
    "Plate": 10,
    "Bailarina": 10,
    "Miss": 0,
}

export type Squad = {
    id: string,
    capitao: string,
    membros: string[],
    nome: string,
    pista: string,
    campeonato: string,
    bg_banner: string,
}

export type Membro = {
    id: string,
    nome: string,
    foto: string,
    email: string,
    nascimento: Date,
    contatos: string[],
}