import { IsArray, IsMongoId, IsNotEmpty, IsString, MinLength } from "class-validator";
import { MensagemEnum } from "../enum/mensagem.enum";

export class PautaUpdateViewModel {
    @IsMongoId({message: MensagemEnum.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemEnum.CAMPO_OBRIGATORIO})
    _id: string;
    
    @IsArray({message: MensagemEnum.CAMPO_INVALIDO})
    @MinLength(1, {message: MensagemEnum.CAMPO_INVALIDO})
    @IsNotEmpty({message: MensagemEnum.CAMPO_OBRIGATORIO})
    frequencia: [{dataHora: string, presente: boolean}];

    @IsString({message: MensagemEnum.CAMPO_INVALIDO})
    atraso: string;

    @IsString({message: MensagemEnum.CAMPO_INVALIDO})
    observacao: string;
}