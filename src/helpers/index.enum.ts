
export enum NivelFluenciaEnum {
    iniciante = "INICIANTE",
    basico = "BÁSICO",
    intermediario = "INTERMEDIÁRIO",
    avancao = "AVANÇADO"
}

export enum AcessoEnum {
    admin = "ADMIN",
    professor = "PROFESSOR",
    aluno = "aluno",
    visitante = "VISITANTE"
}

export enum StatusEnum {
    pendente = "PENDENTE",
    confirmado = "CONFIRMADO",
    inativo = "INATIVO",
    ativo = "ATIVO"
}

export enum IdiomaEnum {
    ingles = "INGLÊS"
}

export enum MensagensEnum {
    formatoInvalido = "Preencha os campos com formatos válidos.",
    campoObrigatorio = "Campos obrigatórios estão vazios.",
    erro = "Ocorreu um erro inesperado, tente novamente mais tarde.",
    naoAutorizado = "Não Autorizado.",
    naoEncontrado = "Nenhuma informação encontrada."
}

export enum TagTurmaEnum{
    particular = "PARTICULAR",
    turma = "TURMA"
}

export enum FrequenciaTurmaEnum{
    um = "Uma vez na semana",
    dois = "Duas vezes na semana",
    tres = "Três vezes na semana"
}

export enum AcaoEnum{
    criouUsuario = "Criou usuário",
    ativarUsuario = "Usuário ativado",
}