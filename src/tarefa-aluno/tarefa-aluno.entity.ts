import { Aluno } from "../aluno/aluno.interface";
import { StatusEnum } from "../enum/status.enum";
import { Tarefa } from "../tarefa/tarefa.interface";

export class TarefaAlunoEntity {
    constructor(
        public tarefa: Tarefa,
        public aluno: Aluno,
        public status: StatusEnum
    ) { }
}

export class TarefaAlunoStatusEntity {
    constructor(
        public status: StatusEnum
    ) { }
}
