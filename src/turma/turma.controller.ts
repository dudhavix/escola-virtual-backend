import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { TurmaService } from "src/turma/turma.service";
import { TurmaViewModel } from "./turma.dto";


@Controller("api/turma")
export class TurmaController {

    constructor(
        private readonly turmaService: TurmaService
    ){}

    @Post("/create")
    @UsePipes(ValidationPipe)
    async create( @Body() turma: TurmaViewModel ): Promise<any> {
        return this.turmaService.create(turma);
    }
}