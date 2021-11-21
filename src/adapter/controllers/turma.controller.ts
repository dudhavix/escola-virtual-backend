import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTurmaViewModel } from "src/domain/dtos/create-turma.dto";
import { UpdateTurmaViewModel } from "src/domain/dtos/update-turma.dto";
import { Turma } from "src/domain/interfaces/turma.inteface";
import { TurmaService } from "src/domain/services/turma.service";

@Controller("api/turma")
export class TurmaController {

    constructor(
        private readonly turma_service: TurmaService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() turma: CreateTurmaViewModel ): Promise<HttpException> {
        return await this.turma_service.create(turma);
    }

    @Get("/readAll")
    async readAll(): Promise<Turma[]> {
        return await this.turma_service.readAll();
    }
    
    @Get("/readOneIDAlunos/:idTurma")
    async readOneIDAlunos( @Param("idTurma") idTurma: string ): Promise<Turma> {
        return await this.turma_service.readOneIDAlunos(idTurma);
    }

    @Put("/update")
    async update( @Body() turma: UpdateTurmaViewModel ): Promise<HttpException> {
        return await this.turma_service.update(turma);
    }

    @Delete("/delete/:idTurma")
    async delete( @Param("idTurma") idTurma: string ): Promise<HttpException> {
        return await this.turma_service.delete(idTurma);
    }
}