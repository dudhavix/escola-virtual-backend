import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as momentTimezone from 'moment-timezone'
import * as dotenv from "dotenv";
import { join } from "path";
import * as express from "express";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(express.static(join("public")));
    app.enableCors();

    Date.prototype.toJSON = function (): any {
        return momentTimezone(this)
            .tz('America/Sao_Paulo')
            .format('DD-MM-YYYY HH:mm:ss')
    }

    console.log(process.env.PORTA);

    await app.listen(process.env.PORT || 3333);
}

bootstrap();