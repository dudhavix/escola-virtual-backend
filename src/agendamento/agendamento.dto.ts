import { IsNotEmpty, IsString } from "class-validator";
import { Turma } from "../turma/turma.interface";

export class AgendamentoCreateViewModel {
    @IsNotEmpty({message: "tem que ser turma"})
    turma: Turma;

    @IsNotEmpty()
    @IsString()
    dataHora: string;
}

export class AgendamentoUpdateViewModel {
    @IsString()
    @IsNotEmpty()
    readonly _id: string;

    @IsNotEmpty()
    readonly turma: Turma;
    
    @IsNotEmpty()
    @IsString()
    dataHora: string;

    @IsString()
    @IsNotEmpty()
    readonly status: string;
}