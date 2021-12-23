import { Controller, Get } from "@nestjs/common";

@Controller("api/")
export class AlunoController {
    constructor() { }

    @Get("")
    index() {
        return "Bem vindo";
    }
}