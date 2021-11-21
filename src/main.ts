import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as momentTimezone from 'moment-timezone'
import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    Date.prototype.toJSON = function(): any {
        return momentTimezone(this)
          .tz('America/Sao_Paulo')
          .format('DD-MM-YYYY HH:mm:ss')
      }

      
    await app.listen(process.env.PORTA);
}

bootstrap();