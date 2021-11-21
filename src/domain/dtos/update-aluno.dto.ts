import { IsBoolean, IsDate, IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Nivel } from "../utils/nivel-enum";

export class UpdateAlunoViewModel {
    
    readonly _id: string;

    @IsString()
    @IsOptional()
    nome: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsPhoneNumber("BR")
    @IsOptional()
    telefone: string;

    @IsString()
    @IsOptional()
    data_nascimento: string;

    @IsString()
    @IsOptional()
    endereco: string;

    @IsString()
    @IsOptional()
    nivel_atual: Nivel;

    @IsString()
    @IsOptional()
    nivel_meta: Nivel;

    @IsString()
    @IsOptional()
    observacao: string;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}