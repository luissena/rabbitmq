import { Body, Controller, Post } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';

@Controller('fibonacci')
export class RabbitmqController {
  constructor(private readonly rabbitMQService: RabbitmqService) {}

  @Post()
  async sendMessageToQueue(@Body() messageDto: { message: string }) {
    const { message } = messageDto;
    await this.rabbitMQService.sendMessage('fibonacci', message);
    return { status: 'Mensagem enviada com sucesso!' };
  }
}
