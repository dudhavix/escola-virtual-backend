import { IsAscii, IsEmail, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";
import { isValidObjectId } from "mongoose";
import { IdiomaEnum } from "src/enum/idioma.enum";
import { Arquivo } from "../arquivo/arquivo.interface";
import { NivelAcessoEnum } from "../enum/nivel-acesso.enum";
import { NivelEnum } from "../enum/nivel.enum";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Professor } from "../professor/professor.interface";
import { Turma } from "../turma/turma.interface";

export class UsuarioProfessorViewModel {
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

export class UsuarioAlunoViewModel {
    @IsString()
    @IsOptional()
    _id: string;

    @IsOptional()
    professor: Professor;

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

export class LoginViewModel {
    @IsEmail({},{message: MensagemHelper.EMAIL_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    email: string;

    @IsAscii()
    @MinLength(6, {message: MensagemHelper.SENHA_VALIDA})
    @MaxLength(12, {message: MensagemHelper.SENHA_VALIDA})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    senha: string;
}

export class UsuarioViewModel {
    @IsMongoId()
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    _id: string;

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
}

export class UsuarioUpdateViewModel {
    @IsString()
    @IsNotEmpty()
    _id: string;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    telefone: string;

    @IsString()
    @IsNotEmpty()
    dataNascimento: string;

    @IsNotEmpty()
    foto: Arquivo;
}