import { databaseClose, databaseConnect } from '@/helpers/database';
import User from '@/models/user';

export const addNewCategory = async () => {
  await databaseConnect();

  const userId = process.env.TEMP_USER_ID;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found!');
  }

  user.categories.expense.push({ name: 'None' });

  // await user.save()

  await databaseClose();
  return;
};
