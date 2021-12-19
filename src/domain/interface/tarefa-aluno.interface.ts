import { Aluno } from "./aluno.interface";
import { Tarefa } from "./tarefa.interface";

export interface TarefaAluno {
    tarefa: Tarefa;
    aluno: Aluno;
    concluido: boolean;
}