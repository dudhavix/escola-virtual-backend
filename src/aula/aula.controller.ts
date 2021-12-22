import { Body, Controller, Delete, Get, Header, Headers, HttpException, Param, Post, Put, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { Professor } from "../professor/professor.interface";
import { AulaCreateViewModel, AulaUpdateViewModel } from "./aula.dto";
import { AulaService } from "./aula.service";

@Controller("api/aula")
export class AulaController {

    constructor(
        private readonly aulaService: AulaService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() aula: AulaCreateViewModel ): Promise<HttpException> {
        return this.aulaService.create(aula);
    }

    @Get("/getAll")
    async getAll( @Headers("professor") professor: Professor ): Promise<any> {
        return this.aulaService.getAll(professor);
    }

    @Get("/getId/:aula")
    async getId( @Param("aula") aula: string, @Headers("professor") professor: Professor ): Promise<any> {
        return this.aulaService.getId(aula);
    }

    @Put("/update")
    async update( @Body() aula: AulaUpdateViewModel ): Promise<HttpException> {
        return this.aulaService.update(aula);
    }

    @Delete("/delete/:aula")
    async delete( @Param("aula") aula: string ): Promise<HttpException> {
        return this.aulaService.delete(aula);
    }
}