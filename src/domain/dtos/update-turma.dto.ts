import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { DefinicaoTurma } from "../utils/definicao-turma-enum";

export class UpdateTurmaViewModel {
    readonly _id: string;
    
    @IsString()
    @IsOptional()
    definicao: DefinicaoTurma;

    @IsString()
    @IsOptional()
    nome: string;

    @IsArray()
    @ArrayMinSize(1)
    alunos: Array<string>;

    @IsString()
    @IsOptional()
    frequencia: string;

    @IsString()
    @IsOptional()
    observacao: string;
}