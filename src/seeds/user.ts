import { databaseConnect, databaseClose } from '@/helpers/database';
import User from '@/models/user';

databaseConnect();

// WARNING
// This function deletes all the users in the Users collection and generates a new one. Therefore, after executing this function(npm run seed-user), you must change all code that depends on the properties of the user such as its _id property
const seedUser = async () => {
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
        name: 'Cash',
        color: '#7C3AED'
      },
      {
        name: 'GCash',
        color: '#2994FC'
      },
      {
        name: 'Savings',
        color: '#21C5E0'
      },
      {
        name: 'Paypal',
        color: '#F23E94'
      }
    ]
  });

  await user.save();

  console.log('User generated:');
  console.log(user.categories);
  databaseClose();
};
seedUser();
