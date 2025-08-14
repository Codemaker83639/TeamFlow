import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: parseInt(configService.get<string>('POSTGRES_PORT') || '5432', 10),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),

        // ---- CAMBIOS CLAVE ----
        // 1. Descubre automáticamente todas tus entidades (User, Team, Project, Task, etc.)
        autoLoadEntities: true,

        // 2. Desactiva la sincronización para usar el sistema de migraciones que creamos
        synchronize: false,
      }),
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
    ProjectsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }