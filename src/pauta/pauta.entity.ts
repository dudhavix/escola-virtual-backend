import { Aluno } from "../aluno/aluno.interface";

export class PautaEntity {
    constructor(
        public aluno: Aluno,
        public presente: boolean,
        public atraso: string,
        public observacao: string
    ) { }
}