import { Body, Controller, Get, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreatePautaViewModel } from "src/domain/dtos/create-pauta.dto";
import { Pauta } from "src/domain/interfaces/pauta.interface";
import { PautaService } from "src/domain/services/pauta.service";

@Controller("api/pauta")
export class PautaController {

    constructor(
        private readonly pauta_service: PautaService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() pauta: CreatePautaViewModel ): Promise<void> {
        return await this.pauta_service.create(pauta);
    }

    @Get("/readIDAluno/:idAluno")
    async readIDAluno( @Param("idAluno") idAluno: string ): Promise<Pauta[]> {
        return await this.pauta_service.readIDAluno(idAluno);
    }
}