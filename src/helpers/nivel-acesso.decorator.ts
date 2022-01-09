import { SetMetadata } from "@nestjs/common";

export const NivelAcessoDecorator = (nivelAcesso: string) => SetMetadata("nivelAcesso", nivelAcesso);