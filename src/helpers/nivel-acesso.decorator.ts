import { SetMetadata } from "@nestjs/common";

export const NivelAcessoDecorator = (acesso: string) => SetMetadata("acesso", acesso);