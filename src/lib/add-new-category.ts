import { databaseClose, databaseConnect } from '@/helpers/database';
import User from '@/models/user';

export const addNewCategory = async () => {
  await databaseConnect();

  const userId = process.env.TEMP_USER_ID;

  const user = await User.findById(userId);
  if (!user) {
    console.log('User not found!');
    return;
  }

  user.categories.expense.push({ name: 'None' });

  // await user.save()

  await databaseClose();
  return;
};
