import { BadRequestException, NotFoundException } from "@nestjs/common";
import { MensagemHelper } from "./mensagens.helper";

export const EmitirMensagemHelper = (status: number) => {
    if (status == 401) throw new NotFoundException(MensagemHelper.OPERACAO_NAO_AUTORIZADA);
    if (status == 404) throw new NotFoundException(MensagemHelper.NADA_ENCONTRADO);
    if (status == 200) throw new NotFoundException(MensagemHelper.ALTERACOES_REALIZADAS);
    if (status == 201) throw new NotFoundException(MensagemHelper.CRIADO_SUCESSO);
    
    throw new BadRequestException(MensagemHelper.OCORREU_ERRO);
}