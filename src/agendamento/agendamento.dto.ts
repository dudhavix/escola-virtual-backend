import { IsNotEmpty, IsString } from "class-validator";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export class AgendamentoCreateViewModel {
    @IsNotEmpty()
    professor: Professor;

    @IsNotEmpty()
    turma: Turma;

    @IsNotEmpty()
    @IsString()
    dataHora: string;
}

export class AgendamentoUpdateViewModel {
    readonly _id: string;
    readonly professor: Professor;
    readonly turma: Turma;
    
    @IsNotEmpty()
    @IsString()
    dataHora: string;
}