// En: server/src/projects/projects.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    // No necesitamos controllers o services por ahora, solo registrar la entidad.
})
export class ProjectsModule { }