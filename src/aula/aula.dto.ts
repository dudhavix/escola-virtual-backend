import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Professor } from "src/professor/professor.interface";
import { Arquivo } from "../arquivo/arquivo.interface";

export class AulaCreateViewModel {
    @IsString()
    @IsNotEmpty()
    professor: Professor;

    @IsString()
    @IsNotEmpty()
    temaAula: string;

    @IsString()
    observacao: string;

    @IsArray()
    arquivos: Array<Arquivo>;
}

export class AulaUpdateViewModel {
    readonly _id: string;
    readonly professor: Professor;

    @IsString()
    @IsOptional()
    temaAula: string;

    @IsString()
    @IsOptional()
    observacao: string;

    @IsArray()
    @IsOptional()
    arquivos: Array<Arquivo>;
}