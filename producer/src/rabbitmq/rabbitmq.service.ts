import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService {
  private channel: amqp.Channel;

  constructor() {
    this.connectToRabbitMQ();
  }

  async connectToRabbitMQ() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    this.channel = await connection.createChannel();
  }

  async sendMessage(queueName: string, message: string) {
    this.channel.assertQueue(queueName, { durable: true });
    this.channel.sendToQueue(queueName, Buffer.from(message));
  }
}
