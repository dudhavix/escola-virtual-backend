import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IdiomaEnum } from "src/enum/idioma.enum";
import { Arquivo } from "../arquivo/arquivo.interface";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelEnum } from "../enum/nivel.enum";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export class ProfessorViewModel {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;

    @IsString()
    @IsNotEmpty()
    dataNascimento: string;

    @IsNotEmpty()
    foto: Arquivo;

    @IsString()
    @IsNotEmpty()
    nivelAcesso: NivelAcessoEnum;

    @IsString()
    @IsNotEmpty()
    idioma: IdiomaEnum;
}

export class AlunoViewModel {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;

    @IsString()
    @IsNotEmpty()
    dataNascimento: string;
    
    @IsNotEmpty()
    foto: Arquivo;

    @IsString()
    @IsNotEmpty()
    nivelAcesso: NivelAcessoEnum;

    @IsNotEmpty()
    professor: Professor;

    @IsNotEmpty()
    turma: Turma;

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
}