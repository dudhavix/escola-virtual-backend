import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { Arquivo } from "../arquivo/arquivo.interface";
import { NivelEnum } from "../enum/nivel.enum";
import { StatusEnum } from "../enum/status.enum";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export class AlunoCreateViewModel {
    @IsNotEmpty()
    professor: Professor;

    @IsNotEmpty()
    turma: Turma;

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
    dataNascimento: string;  

    @IsString()
    @IsNotEmpty()
    endereco: string;  

    @IsString()
    observacao: string;  
    
    @IsString()
    @IsNotEmpty()
    nivelAtual: NivelEnum;

    @IsString()
    @IsNotEmpty()
    nivelMeta: NivelEnum;

    @IsNotEmpty()
    foto: Arquivo;
}

export class AlunoUpdateViewModel {
    readonly _id: string;
    readonly professor: Professor;

    @IsOptional()
    turma: Turma;

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
    dataNascimento: string;  

    @IsString()
    @IsOptional()
    endereco: string;  

    @IsString()
    @IsOptional()
    observacao: string;  

    @IsString()
    @IsOptional()
    foto: Arquivo;
    
    @IsString()
    @IsOptional()
    nivelAtual: NivelEnum;

    @IsString()
    @IsOptional()
    nivelMeta: NivelEnum;

    @IsString()
    @IsOptional()
    status: StatusEnum;
}