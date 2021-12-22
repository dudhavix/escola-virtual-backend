import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Arquivo } from "../arquivo/arquivo.interface";
import { Aula } from "../aula/aula.interface";

export class TarefaCreateViewModel {
    @IsNotEmpty()
    aula: Aula;

    @IsArray()
    arquivos: Array<Arquivo>;

    @IsString()
    observacao: string;

    @IsString()
    @IsNotEmpty()
    dataEntrega: string;
}

export class TarefaUpdateViewModel {
    readonly _id: string;

    @IsOptional()
    aula: Aula;

    @IsArray()
    @IsOptional()
    arquivos: Array<Arquivo>;

    @IsString()
    @IsOptional()
    observacao: string;

    @IsString()
    @IsOptional()
    dataEntrega: string;
}