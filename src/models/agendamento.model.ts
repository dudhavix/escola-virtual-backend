import { IsNotEmpty, IsString } from "class-validator";
import { MensagensEnum } from "../helpers/index.enum";
import { Turma } from "../interfaces/turma.interface";
import { Usuario } from "../interfaces/usuario.interface";

export class AgendamentoCreateModel {
    // @IsNotEmpty({message: MensagensEnum.campoObrigatorio})
    // @IsString({message: MensagensEnum.formatoInvalido})
    // usuario: Usuario;

    @IsNotEmpty({message: MensagensEnum.campoObrigatorio})
    @IsString({message: MensagensEnum.formatoInvalido})
    turma: Turma;

    @IsNotEmpty({message: MensagensEnum.campoObrigatorio})
    @IsString({message: MensagensEnum.formatoInvalido})
    dataHora: string;
}