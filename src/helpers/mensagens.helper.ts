import { BadRequestException, NotAcceptableException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { MensagemEnum } from "../enum/mensagem.enum";

export const MensagemHelper = {
    OCORREU_ERRO: "Desculpe, ocorreu um erro no servidor.",
    OPERACAO_NAO_AUTORIZADA: "Usuário não autorizado",

    NADA_ENCONTRADO_SUCESSO: "Nenhuma informação encontrada.",
    NADA_ENCONTRADO_ERRO: "Desculpe ocorreu um erro ao procurar as informações.",
    
    CRIADO_ERRO: "Desculpe ocorreu um erro ao criar.",
    
    DELETADO_ERRO: "Desculpe ocorreu um erro ao excluir.",
    
    ALTERACOES_ERRO: "Desculpe, ocorreu um erro e suas alterações não foram realizadas.",
    
    CAMPO_INVALIDO: "Campos foram preenchidos de forma incorreta.",
    CAMPO_OBRIGATORIO: "Campos obrigatórios não foram preenchidos.",
    
    EMAIL_INVALIDO: "Esse email é inválido.",
    EMAIL_OU_SENHA_INVALIDO: "Email ou senha incorretos",
    EMAIL_EXISTE: "Esse email ja esta sendo utilizado.",
    
    SENHA_VALIDA: "Necessário uma senha válida entre 6 e 12 caractéres",
};


export const EmitirMensagemHelper = (msg: MensagemEnum) => {
    if (msg == MensagemEnum.OCORREU_ERRO) throw new BadRequestException(MensagemHelper.OCORREU_ERRO);
    if (msg == MensagemEnum.OPERACAO_NAO_AUTORIZADA) throw new UnauthorizedException(MensagemHelper.OPERACAO_NAO_AUTORIZADA);

    if (msg == MensagemEnum.EMAIL_OU_SENHA_INVALIDO) throw new UnauthorizedException(MensagemHelper.EMAIL_OU_SENHA_INVALIDO);
    if (msg == MensagemEnum.EMAIL_EXISTE) throw new NotAcceptableException(MensagemHelper.EMAIL_EXISTE);

    if (msg == MensagemEnum.NADA_ENCONTRADO_SUCESSO) throw new NotFoundException(MensagemHelper.NADA_ENCONTRADO_SUCESSO);
    if (msg == MensagemEnum.NADA_ENCONTRADO_ERRO) throw new BadRequestException(MensagemHelper.NADA_ENCONTRADO_ERRO);

    if (msg == MensagemEnum.CRIADO_ERRO) throw new BadRequestException(MensagemHelper.CRIADO_ERRO);
    if (msg == MensagemEnum.DELETADO_ERRO) throw new BadRequestException(MensagemHelper.DELETADO_ERRO);
    if (msg == MensagemEnum.ALTERACOES_ERRO) throw new BadRequestException(MensagemHelper.ALTERACOES_ERRO);
}