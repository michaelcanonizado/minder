import Person from '@/models/user-v2';
import { profile } from 'console';

const seedPerson = async () => {
  const user = new Person({
    profile: {
      username: 'Mikey'
    },
    lastLogin: new Date()
  });

  console.log(user);
};

seedPerson();
