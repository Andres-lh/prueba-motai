import { newDb } from 'pg-mem';
import { User } from '../../src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export const setupDatabase = async (): Promise<DataSource> => {
  const db = newDb();

  db.public.registerFunction({
    name: 'uuid_generate_v4',
    implementation: uuidv4,
  });
  db.public.registerFunction({
    name: 'current_database',
    implementation: () => 'test',
  });
  db.public.registerFunction({
    name: 'version',
    implementation: () => 'PostgreSQL 13.0',
  });

  // Create a TypeORM datasource directly from entities
  const dataSource = (await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [User],
    synchronize: true, // only works if you provide explicit entities
    migrationsRun: false,
    logging: false,
  })) as DataSource;

  await dataSource.initialize();
  return dataSource;
};
