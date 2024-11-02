import { AppDataSource } from '@config/index';

async function seed() {
  await AppDataSource.initialize();

  // Add seed data

  console.log('Database seeded');
}

seed().catch((error) => console.log(error));
