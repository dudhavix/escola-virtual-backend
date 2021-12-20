import { Body, Controller, Get, HttpException, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProfessorService } from "src/professor/professor.service";
import { ProfessorCreateViewModel } from "./professor.dto";

@Controller("api/professor")
export class ProfessorController {

    constructor(
        private readonly professorService: ProfessorService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() professor: ProfessorCreateViewModel ): Promise<HttpException> {
        return await this.professorService.create(professor);
    }

    @Get("/getAll")
    async getAll(): Promise<any> {
        return await this.professorService.getAll();
    }

    @Get("/getId/:professor")
    async getId( @Param("professor") professor: string ): Promise<any> {
        return await this.professorService.getId(professor);
    }

}