import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  constructor() { }

  @Get()
  findAll() {
    return `Hanjeahwan API build with NestJS & TypeScript & JavaScript (ES6, ES7, ES8) 👋😻🚀`
  }
}
