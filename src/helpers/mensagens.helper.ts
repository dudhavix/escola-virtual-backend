export const MensagemHelper = {
    STATUS_INCORRETO: (value: string): string => {
        return `Usuário com status ${value.toUpperCase()}, favor contatar o suporte.`
    },
    EMAIL_INCORRETO: "Não foi encontrado usuário com esse email.",
    SENHA_INCORRETA: "Senha incorreta.",
    EMAIL_VALIDO: "Necessário um email válido.",
    CAMPO_VAZIO_INVALIDO: (value: string): string => {
        return `Campo ${value.toUpperCase()} não pode ficar vazio.`
    },
    USUARIO_NAO_AUTORIZADO: "Usuário não autorizado",
    USUARIO_ATIVIDO: "Usuário ativado",
    USUARIO_DESATIVADO: "Usuário desativado",
};