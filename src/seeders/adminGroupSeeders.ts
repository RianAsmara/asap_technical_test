import { AppDataSource } from '@config/index';
import { Group } from '@models/groupModel';

export async function seedAdminGroups() {
  console.log('Seeding admin groups...');

  const groupRepo = AppDataSource.getRepository(Group);

  const groups = [{ name: 'user' }, { name: 'admin' }];

  for (const group of groups) {
    const newGroup = groupRepo.create(group);
    await groupRepo.save(newGroup);
  }
}
