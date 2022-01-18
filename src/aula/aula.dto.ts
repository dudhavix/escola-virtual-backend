import { IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Arquivo } from "../arquivo/arquivo.interface";
import { MensagemHelper } from "../helpers/mensagens.helper";

export class AulaCreateViewModel {
    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    temaAula: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    observacao: string;

    @IsArray({message: MensagemHelper.CAMPO_INVALIDO})
    arquivos: Array<Arquivo>;
}

export class AulaUpdateViewModel {
    @IsMongoId({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    _id: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    temaAula: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    observacao: string;

    @IsArray({message: MensagemHelper.CAMPO_INVALIDO})
    arquivos: Array<Arquivo>;
}