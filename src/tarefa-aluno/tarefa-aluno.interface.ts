import { Aluno } from "../aluno/aluno.interface";
import { StatusEnum } from "../enum/status.enum";
import { Tarefa } from "../tarefa/tarefa.interface";

export interface TarefaAluno {
    tarefa: Tarefa;
    aluno: Aluno;
    status: StatusEnum;
}

export interface TarefaAlunoStatus {
    status: StatusEnum;
}