import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqService } from './rabbitmq.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FIBONACCI_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:15672'],
          queue: 'fibonacci_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [RabbitmqService],
  controllers: [RabbitmqController],
})
export class RabbitmqModule {}
