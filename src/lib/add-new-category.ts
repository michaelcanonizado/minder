import { databaseClose, databaseConnect } from '@/helpers/database';
import User from '@/models/user';

export const addNewCategory = async () => {
  console.log('adding category...');

  await databaseConnect();

  const userId = process.env.TEMP_USER_ID;

  const user = await User.findById(userId);
  if (!user) {
    console.log('User not found!');
    return;
  }

  user.categories.expense.push({ name: 'None' });

  console.log(user.categories);

  await user.save();

  await databaseClose();
  return;
};
