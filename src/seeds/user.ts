import { databaseConnect, databaseClose } from '@/helpers/database';
import User from '@/models/user';

databaseConnect();

const user = new User({
  profile: {
    username: 'mikey'
  },
  lastLogin: Date.now(),
  currency: {
    code: 'PHP',
    name: 'Philippine Peso'
  },
  categories: {
    expense: [
      {
        id: '1',
        name: 'Food',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '2',
        name: 'Transportation',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '3',
        name: 'Shopping',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '4',
        name: 'Phone',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '5',
        name: 'Housing',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '6',
        name: 'Education',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '7',
        name: 'Entertainment',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '8',
        name: 'Other',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      }
    ],
    income: [
      {
        id: '1',
        name: 'Salary',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '2',
        name: 'Allowance',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '3',
        name: 'Investments',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '4',
        name: 'Business',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      },
      {
        id: '5',
        name: 'Other',
        createdAt: new Date(),
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      }
    ]
  },
  wallets: [
    {
      id: '1',
      name: 'Cash',
      color: '#7C3AED',
      balance: 2810,
      createdAt: new Date(),
      transactionCount: 3,
      isDeleted: {
        status: false,
        deletedAt: new Date()
      }
    },
    {
      id: '2',
      name: 'GCash',
      color: '#2994FC',
      balance: 500,
      createdAt: new Date(),
      transactionCount: 0,
      isDeleted: {
        status: false,
        deletedAt: new Date()
      }
    },
    {
      id: '3',
      name: 'Savings',
      color: '#21C5E0',
      balance: 2000,
      createdAt: new Date(),
      transactionCount: 0,
      isDeleted: {
        status: false,
        deletedAt: new Date()
      }
    },
    {
      id: '4',
      name: 'Paypal',
      color: '#F23E94',
      balance: 700,
      createdAt: new Date(),
      transactionCount: 0,
      isDeleted: {
        status: false,
        deletedAt: new Date()
      }
    }
  ]
});

user
  .save()
  .then(async () => {
    const foundUser = await User.findOne({});
    console.log(foundUser);
    databaseClose();
  })
  .catch(error => {
    console.log('Error saving user!');
    console.log(error);
    databaseClose();
  });
