import 'reflect-metadata';
import dataSource from '../typeorm.config';
import { UserOrmEntity } from '../modules/users/infrastructure/user.orm-entity';

async function seed() {
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(UserOrmEntity);

  const users = [
    { username: 'alice', password: 'password123' },
    { username: 'bob', password: 'password456' },
    { username: 'charlie', password: 'password789' },
  ];

  for (const user of users) {
    const exists = await userRepo.findOne({
      where: { username: user.username },
    });

    if (!exists) {
      await userRepo.save(user);
      console.log(`Seeded user: ${user.username}`);
    } else {
      console.log(`User already exists: ${user.username}`);
    }
  }

  await dataSource.destroy();
  console.log('Seeding complete 🌱');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
