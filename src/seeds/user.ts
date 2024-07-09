import { databaseConnect, databaseClose } from '@/helpers/database/database';
import User from '@/models/user';

import { categoryColors } from '@/types';

// WARNING
// This function deletes all the users in the Users collection and generates a new one. Therefore, after executing this function(npm run seed-user), you must change all code that depends on the properties of the user such as in .env.local

/**
 * Seeds a user document
 *
 * @returns void
 */

const expenses = [
  {
    name: 'Food',
    color: categoryColors[0]
  },
  {
    name: 'Transportation',
    color: categoryColors[1]
  },
  {
    name: 'Shopping',
    color: categoryColors[2]
  },
  {
    name: 'Phone',
    color: categoryColors[3]
  },
  {
    name: 'Housing',
    color: categoryColors[4]
  },
  {
    name: 'Education',
    color: categoryColors[5]
  },
  {
    name: 'Entertainment',
    color: categoryColors[6]
  },
  {
    name: 'Other',
    color: categoryColors[7]
  },
  {
    name: 'None',
    color: categoryColors[8]
  }
];
const incomes = [
  {
    name: 'Salary',
    color: categoryColors[0]
  },
  {
    name: 'Allowance',
    color: categoryColors[1]
  },
  {
    name: 'Investments',
    color: categoryColors[2]
  },
  {
    name: 'Business',
    color: categoryColors[3]
  },
  {
    name: 'Other',
    color: categoryColors[4]
  }
];

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
      expense: expenses,
      income: incomes
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

  return;
};
seedUser();
