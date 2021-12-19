import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FrequenciaEnum } from "src/domain/enum/frequencia.enum";
import { TagEnum } from "src/domain/enum/tag.enum";
import { Professor } from "src/domain/interface/professor.interface";

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