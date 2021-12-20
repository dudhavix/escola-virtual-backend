import { Aluno } from "../aluno/aluno.interface";
import { Tarefa } from "../tarefa/tarefa.interface";

export interface TarefaAluno {
    tarefa: Tarefa;
    aluno: Aluno;
    concluido: boolean;
}