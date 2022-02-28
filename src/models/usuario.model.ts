import { IsEmail, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IdiomaEnum, NivelFluenciaEnum, MensagensEnum } from "../helpers/index.enum";
import { Turma } from "../interfaces/turma.interface";
import { Aluno, Usuario } from "../interfaces/usuario.interface";

export class UsuarioCreateModel {
    @IsString({message: MensagensEnum.formatoInvalido})
    @IsNotEmpty({message: MensagensEnum.campoObrigatorio})
    nome: string;
    telefone: string;
    dataNascimento: string;
    endereco: string;
    idioma: IdiomaEnum;

    @IsEmail({message: MensagensEnum.formatoInvalido})
    @IsNotEmpty({message: MensagensEnum.campoObrigatorio})
    email: string;

    @IsOptional()
    aluno: Aluno;
}