import { StatusEnum } from "../enum/status.enum";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export class AgendamentoCreateEntity {
    constructor(
        public professor: Professor,
        public turma: Turma,
        public dataHora: string,
        public status: StatusEnum,
    ) { }
}

export class AgendamentoUpdateEntity {
    constructor(
        public dataHora: string,
        public _id: string
    ) { }
}