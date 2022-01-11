import { IsNotEmpty, IsString } from "class-validator";
import { NivelEnum } from "../enum/nivel.enum";
import { Turma } from "../turma/turma.interface";

export class AlunoUpdateViewModel {
    @IsString()
    @IsNotEmpty()
    _id: string;

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