import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Nivel } from "../utils/nivel-enum";

export class CreateAlunoViewModel {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber("BR")
    @IsNotEmpty()
    telefone: string;

    @IsString()
    @IsNotEmpty()
    data_nascimento: string;

    @IsString()
    @IsNotEmpty()
    endereco: string;

    @IsString()
    @IsNotEmpty()
    nivel_atual: Nivel;

    @IsString()
    @IsNotEmpty()
    nivel_meta: Nivel;

    @IsString()
    @IsOptional()
    observacao: string;

    status: boolean;
}