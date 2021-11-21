import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DefinicaoTurma } from "../utils/definicao-turma-enum";

export class CreateTurmaViewModel {
    @IsString()
    @IsNotEmpty()
    definicao: DefinicaoTurma;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsArray()
    @ArrayMinSize(1)
    alunos: Array<string>;

    @IsString()
    @IsNotEmpty()
    frequencia: string;

    @IsString()
    @IsOptional()
    observacao: string;
}