import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FrequenciaEnum } from "src/enum/frequencia.enum";
import { TagEnum } from "src/enum/tag.enum";
import { Professor } from "src/professor/professor.interface";

export class TurmaCreateViewModel {
    @IsString()
    @IsNotEmpty()
    professor: Professor;

    @IsString()
    @IsNotEmpty()
    tag: TagEnum;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    frequencia: FrequenciaEnum;

    @IsString()
    observacao: string;
}