import { AppDataSource } from '@config/index';
import { Role } from '@models/roleModel';

export async function seedRoles() {
  console.log('Seeding roles...');

  const groupRepo = AppDataSource.getRepository(Role);

  const roles = [{ name: 'user' }, { name: 'admin' }];

  for (const rolesData of roles) {
    const newRoles = groupRepo.create(rolesData);
    await groupRepo.save(newRoles);
  }
}
