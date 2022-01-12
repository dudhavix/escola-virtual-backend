export const MensagemHelper = {
    STATUS_INCORRETO: (value: string): string => {
        return `Usuário com status ${value.toUpperCase()}, favor contatar o suporte.`
    },
    CAMPO_VAZIO_INVALIDO: (value: string): string => {
        return `Campo ${value.toUpperCase()} não pode ficar vazio.`
    },

    OCORREU_ERRO: "Desculpe, ocorreu um erro no servidor.",
    
    USUARIO_NAO_AUTORIZADO: "Usuário não autorizado",
    USUARIO_ATIVIDO: "Usuário ativado",
    USUARIO_DESATIVADO: "Usuário desativado",
    
    EMAIL_VALIDO: "Necessário um email válido.",
    EMAIL_OU_SENHA_INVALIDO: "Email ou senha incorretos",
    EMAIL_EXISTE: "Esse email ja esta sendo utilizado.",
    

    NADA_ENCONTRADO: "Nenhuma informação encontrada.",
    NADA_ENCONTRADO_ERRO: "Desculpe ocorreu um erro ao procurar as informações.",

    CRIADO_SUCESSO: "Criado com sucesso.",
    CRIADO_ERRO: "Desculpe ocorreu um erro ao criar.",

    DELETADO_SUCESSO: "Excluído com sucesso.",
    DELETADO_ERRO: "Desculpe ocorreu um erro ao excluir.",
    
    ALTERACOES_REALIZADAS: "Alterações realizadas.",
    ALTERACOES_NAO_REALIZADAS: "Desculpe, ocorreu um erro e suas alterações não foram realizadas.",

    OPERACAO_NAO_AUTORIZADA: "Essa operação não é permitida ao seu usuário."
};