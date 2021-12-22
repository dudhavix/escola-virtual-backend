import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Aula } from "../aula/aula.interface";
import { Turma } from "../turma/turma.interface";

export class TurmaAulaCreateViewModel {
    @IsString()
    @IsNotEmpty()
    turma: Turma;

    @IsString()
    @IsNotEmpty()
    aula: Aula;
}

export class TurmaAulaUpdateViewModel {
    readonly _id: string;

    @IsString()
    @IsOptional()
    turma: Turma;

    @IsString()
    @IsOptional()
    aula: Aula;
}