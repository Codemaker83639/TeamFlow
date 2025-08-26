import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'teamflow_user',
  password: 'teamflow_password',
  database: 'teamflow',

  // Apuntamos a todos los archivos de entidad y migración dentro de 'src'
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/database/migrations/**/*.ts"],

  synchronize: false,
});