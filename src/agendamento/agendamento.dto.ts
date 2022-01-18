import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { MensagemHelper } from "../helpers/mensagens.helper";
import { Turma } from "../turma/turma.interface";

export class AgendamentoCreateViewModel {
    @IsMongoId({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    turma: Turma;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    dataHora: string;
}

export class AgendamentoUpdateViewModel {
    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    _id: string;

    @IsMongoId({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    turma: Turma;
    
    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    dataHora: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    status: string;
}