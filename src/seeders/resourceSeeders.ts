import { AppDataSource } from '@config/index';
import { Resource } from '@models/resourceModel';

export async function seedResources() {
  console.log('Seeding resources...');

  const groupRepo = AppDataSource.getRepository(Resource);

  const permissions = [{ name: 'login' }, { name: 'register' }, { name: 'user' }];

  for (const resourcesData of permissions) {
    const newResources = groupRepo.create(resourcesData);
    await groupRepo.save(newResources);
  }
}
