import { databaseConnect, databaseClose } from '@/helpers/database';
import User from '@/models/user';

// WARNING
// This function deletes all the users in the Users collection and generates a new one. Therefore, after executing this function(npm run seed-user), you must change all code that depends on the properties of the user such as in .env.local
const seedUser = async () => {
  databaseConnect();

  await User.deleteMany({});
  console.log('Deleted all users!');

  const user = new User({
    profile: {
      username: 'mikey'
    },
    currency: {
      code: 'PHP',
      name: 'Philippine Peso'
    },
    categories: {
      expense: [
        {
          name: 'Food'
        },
        {
          name: 'Transportation'
        },
        {
          name: 'Shopping'
        },
        {
          name: 'Phone'
        },
        {
          name: 'Housing'
        },
        {
          name: 'Education'
        },
        {
          name: 'Entertainment'
        },
        {
          name: 'Other'
        },
        {
          name: 'None'
        }
      ],
      income: [
        {
          name: 'Salary'
        },
        {
          name: 'Allowance'
        },
        {
          name: 'Investments'
        },
        {
          name: 'Business'
        },
        {
          name: 'Other'
        }
      ]
    },
    wallets: [
      {
        name: 'Cash'
      },
      {
        name: 'GCash'
      },
      {
        name: 'Paymaya'
      },
      {
        name: 'Paypal'
      },
      {
        name: 'Bank'
      }
    ]
  });

  await user.save();

  console.log('User generated:');
  console.log(user);
  databaseClose();
};
seedUser();
