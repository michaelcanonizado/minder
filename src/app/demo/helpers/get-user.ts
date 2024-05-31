import { User } from '../data';

export const getUser = (usersColletion: User[], targetUserId: string) => {
  return usersColletion.find(user => {
    if (user.id == targetUserId) {
      return user;
    }
  });
};
