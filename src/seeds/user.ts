import { databaseConnect, databaseClose } from '@/helpers/database';
import User from '@/models/user';

databaseConnect();

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
          id: '1',
          name: 'Food',
          createdAt: new Date()
        },
        {
          id: '2',
          name: 'Transportation',
          createdAt: new Date()
        },
        {
          id: '3',
          name: 'Shopping',
          createdAt: new Date()
        },
        {
          id: '4',
          name: 'Phone',
          createdAt: new Date()
        },
        {
          id: '5',
          name: 'Housing',
          createdAt: new Date()
        },
        {
          id: '6',
          name: 'Education',
          createdAt: new Date()
        },
        {
          id: '7',
          name: 'Entertainment',
          createdAt: new Date()
        },
        {
          id: '8',
          name: 'Other',
          createdAt: new Date()
        }
      ],
      income: [
        {
          id: '1',
          name: 'Salary',
          createdAt: new Date()
        },
        {
          id: '2',
          name: 'Allowance',
          createdAt: new Date()
        },
        {
          id: '3',
          name: 'Investments',
          createdAt: new Date()
        },
        {
          id: '4',
          name: 'Business',
          createdAt: new Date()
        },
        {
          id: '5',
          name: 'Other',
          createdAt: new Date()
        }
      ]
    },
    wallets: [
      {
        id: '1',
        name: 'Cash',
        color: '#7C3AED',
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'GCash',
        color: '#2994FC',
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Savings',
        color: '#21C5E0',
        createdAt: new Date()
      },
      {
        id: '4',
        name: 'Paypal',
        color: '#F23E94',
        createdAt: new Date()
      }
    ]
  });

  await user.save();

  console.log('User generated:');
  console.log(user);
  databaseClose();
};
seedUser();
