import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Aluno } from "../aluno/aluno.interface";
import { StatusEnum } from "../enum/status.enum";
import { Tarefa } from "../tarefa/tarefa.interface";

export class TarefaAlunoCreateViewModel {
    @IsNotEmpty()
    tarefa: Tarefa;

    @IsNotEmpty()
    aluno: Aluno;
}

export class TarefaAlunoUpdateViewModel {
    readonly _id: string;
    
    @IsString()
    status: StatusEnum;
}