import { HttpStatus } from "@nestjs/common";

export interface Resposta {
    menssagem: string;
    status: HttpStatus;
}