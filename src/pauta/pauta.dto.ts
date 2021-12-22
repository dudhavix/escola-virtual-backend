import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Aluno } from "../aluno/aluno.interface";


export class PautaCreateViewModel {
    @IsNotEmpty()
    aluno: Aluno;

    @IsBoolean()
    @IsNotEmpty()
    presente: boolean;

    @IsString()
    atraso: string;

    @IsString()
    observacao: string;
}

export class PautaUpdateViewModel {
    readonly _id: string;
    readonly aluno: Aluno;

    @IsBoolean()
    @IsOptional()
    presente: boolean;

    @IsString()
    @IsOptional()
    atraso: string;

    @IsString()
    @IsOptional()
    observacao: string;
}