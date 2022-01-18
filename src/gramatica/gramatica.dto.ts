import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { NivelEnum } from "../enum/nivel.enum";
import { MensagemHelper } from "../helpers/mensagens.helper";

export class GramaticaCreateViewModel {
    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    sentenca1: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    sentenca2: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    sentenca3: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    nivel: NivelEnum;
}

export class GramaticaUpdateViewModel {
    @IsMongoId()
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    _id: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    sentenca1: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    sentenca2: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    sentenca3: string;

    @IsString({message: MensagemHelper.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemHelper.CAMPO_OBRIGATORIO})
    nivel: NivelEnum;
}