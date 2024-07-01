import { databaseConnect, databaseClose } from '@/helpers/database/database';
import User from '@/models/user';

// WARNING
// This function deletes all the users in the Users collection and generates a new one. Therefore, after executing this function(npm run seed-user), you must change all code that depends on the properties of the user such as in .env.local

/**
 * Seeds a user document
 *
 * @returns void
 */
const colors = [
  '#ff0000',
  '#ff8700',
  '#ffd300',
  '#deff0a',
  '#a1ff0a',
  '#0aff99',
  '#147df5',
  '#580aff',
  '#be0aff',
  '#0aefff'
];
const expenses = [
  {
    name: 'Food',
    color: '#ff0000'
  },
  {
    name: 'Transportation',
    color: '#ff8700'
  },
  {
    name: 'Shopping',
    color: '#ffd300'
  },
  {
    name: 'Phone',
    color: '#deff0a'
  },
  {
    name: 'Housing',
    color: '#a1ff0a'
  },
  {
    name: 'Education',
    color: '#0aff99'
  },
  {
    name: 'Entertainment',
    color: '#580aff'
  },
  {
    name: 'Other',
    color: '#be0aff'
  },
  {
    name: 'None',
    color: '#0aefff'
  }
];
const incomes = [
  {
    name: 'Salary',
    color: '#ff0000'
  },
  {
    name: 'Allowance',
    color: '#ff8700'
  },
  {
    name: 'Investments',
    color: '#0aefff'
  },
  {
    name: 'Business',
    color: '#a1ff0a'
  },
  {
    name: 'Other',
    color: '#580aff'
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
