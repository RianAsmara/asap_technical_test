import { AppDataSource } from '@config/index';
import { Group } from '@models/groupModel';
import { User } from '@models/taskModel';
import { hash } from 'bcrypt';

export async function seedUsers() {
  console.log('Seeding users...');

  const userRepo = AppDataSource.getRepository(User);
  const groupRepo = AppDataSource.getRepository(Group);

  const users = [
    { name: 'Admin', email: 'admin@example.com', password: 'admin password', group: 'admin' },
    { name: 'User', email: 'user@example.com', password: 'user password', group: 'user' },
  ];

  for (const userData of users) {
    // Find the existing group
    const group = await groupRepo.findOneBy({ name: userData.group });
    if (!group) {
      console.error(`Group '${userData.group}' not found. Make sure to seed groups first.`);
      continue;
    }

    // Hash the password
    const hashedPassword = await hash(userData.password, 10);

    // Create and save the user
    const newUser = userRepo.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      group, // Assuming User has a ManyToMany or OneToMany relation with Group
    });

    await userRepo.save(newUser);
  }

  console.log('Users seeded successfully.');
}
