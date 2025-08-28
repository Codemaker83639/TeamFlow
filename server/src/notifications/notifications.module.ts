import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';

@Module({
    providers: [NotificationsGateway],
    exports: [NotificationsGateway], // Exportamos el Gateway para que otros módulos puedan usarlo
})
export class NotificationsModule { }