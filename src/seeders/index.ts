import { AppDataSource } from '@config/index';
import { seedUsers } from './userSeeder';
import { seedAdminGroups } from './adminGroupSeeders';
import { seedResources } from './resourceSeeders';
import { seedRoles } from './roleSeeders';
import { seedPermissions } from './permissionSeeders';

async function seed() {
  await AppDataSource.initialize();

  // Add seed data
  await seedAdminGroups();
  await seedResources();
  await seedRoles();
  await seedPermissions();
  await seedUsers();

  console.log('Database seeded');
}

seed().catch((error) => console.log(error));
