import { IsNotEmpty, IsString } from "class-validator";
import { FrequenciaTurmaEnum, MensagensEnum, TagTurmaEnum } from "../helpers/index.enum";
import { Usuario } from "../interfaces/usuario.interface";

export class TurmaCreateModel {
    @IsNotEmpty({message: MensagensEnum.campoObrigatorio})
    @IsString({message: MensagensEnum.formatoInvalido})
    usuario: Usuario;

    @IsNotEmpty({message: MensagensEnum.campoObrigatorio})
    @IsString({message: MensagensEnum.formatoInvalido})
    tag: TagTurmaEnum;

    @IsNotEmpty({message: MensagensEnum.campoObrigatorio})
    @IsString({message: MensagensEnum.formatoInvalido})
    nome: string;

    @IsNotEmpty({message: MensagensEnum.campoObrigatorio})
    @IsString({message: MensagensEnum.formatoInvalido})
    frequencia: FrequenciaTurmaEnum;

    @IsString({message: MensagensEnum.formatoInvalido})
    observacao: string;
}