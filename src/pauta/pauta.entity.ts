import { Aluno } from "../aluno/aluno.interface";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export class PautaCreateEntity {
    constructor(
        public professor: Professor,
        public turma: Turma,
        public aluno: Aluno,
        public frequencia: [{ dataHora: string, presente: boolean }],
        public atraso: string,
        public observacao: string
    ) { }
}

export class PautaUpdateEntity {
    constructor(
        public frequencia: [{ dataHora: string, presente: boolean }],
        public atraso: string,
        public observacao: string,
        public _id: string
    ) { }
}