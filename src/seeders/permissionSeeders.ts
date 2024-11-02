import { AppDataSource } from '@config/index';
import { Permission } from '@models/permissionModel';

type CRUDAction = 'C' | 'R' | 'U' | 'D';

interface PermissionCombination {
  name: string;
  actions: CRUDAction[];
}

function generateAllCombinations(): PermissionCombination[] {
  const baseActions: CRUDAction[] = ['C', 'R', 'U', 'D'];
  const result: PermissionCombination[] = [];

  function combine(current: CRUDAction[], start: number) {
    result.push({
      name: current.join(''),
      actions: [...current],
    });

    for (let i = start; i < baseActions.length; i++) {
      combine([...current, baseActions[i]], i + 1);
    }
  }

  combine([], 0);

  return result.sort((a, b) => {
    if (a.actions.length !== b.actions.length) {
      return a.actions.length - b.actions.length;
    }
    return a.name.localeCompare(b.name);
  });
}

export async function seedPermissions() {
  console.log('Seeding permissions...');

  const groupRepo = AppDataSource.getRepository(Permission);

  const permissions = generateAllCombinations();

  for (const permissionsData of permissions) {
    const newPermissions = groupRepo.create(permissionsData);
    await groupRepo.save(newPermissions);
  }
}
