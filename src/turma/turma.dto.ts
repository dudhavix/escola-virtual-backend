import { IsNotEmpty, IsString } from "class-validator";
import { FrequenciaEnum } from "src/enum/frequencia.enum";
import { TagEnum } from "src/enum/tag.enum";
import { Professor } from "src/professor/professor.interface";

export class TurmaCreateViewModel {
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

export class TurmaUpdateViewModel {
    readonly _id: string;
    readonly professor: Professor;
    readonly tag: TagEnum;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    frequencia: FrequenciaEnum;

    @IsString()
    @IsNotEmpty()
    observacao: string;
}