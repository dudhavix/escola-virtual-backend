import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export class AgendamentoEntity {
    constructor(
        public professor: Professor,
        public turma: Turma,
        public dataHora: string,
    ) { }
}