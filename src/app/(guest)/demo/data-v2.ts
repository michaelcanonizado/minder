const UsersCollection = [
  {
    id: '123456789',
    firstName: 'michael',
    lastName: 'canonizado',
    username: 'mikey',
    email: 'michael@gmail.com',
    phone: '0123456789',
    gender: '',
    createdAt: new Date(),
    lastLogin: new Date(),
    timezone: {},
    primaryCurrency: {
      code: 'PHP',
      name: 'Philippine Peso',
      htmlCode: '&#8369',
      hexCode: '&#x20B1;',
      uniCode: 'U+020B1'
    },
    balance: {
      totalIncome: 1234,
      totalExpense: 1234,
      currentBalance: 6010
    },
    categories: {
      expense: [
        {
          id: '1',
          name: 'Food',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '2',
          name: 'Transportation',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '3',
          name: 'Shopping',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '4',
          name: 'Phone',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '5',
          name: 'Housing',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '6',
          name: 'Education',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '7',
          name: 'Entertainment',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '8',
          name: 'Other',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        }
      ],
      income: [
        {
          id: '1',
          name: 'Salary',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '2',
          name: 'Allowance',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '3',
          name: 'Investments',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '4',
          name: 'Business',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        },
        {
          id: '5',
          name: 'Other',
          createdAt: new Date(),
          icon: '',
          isDeleted: {
            status: false,
            deletedAt: new Date()
          },
          color: ''
        }
      ]
    },
    wallets: [
      {
        id: '1',
        name: 'Cash',
        color: '#7C3AED',
        description: '',
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
        description: '',
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
        description: '',
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
        description: '',
        balance: 700,
        createdAt: new Date(),
        transactionCount: 0,
        isDeleted: {
          status: false,
          deletedAt: new Date()
        }
      }
    ]
  }
];

const ExpensesCollection = [
  {
    userId: '987654321',
    transactionId: '998877665544332211',
    walletId: '1',
    categoryId: '4',
    amount: 100,
    description: 'lorem ipsum',
    transactionDate: new Date(),
    createdAt: new Date()
  },
  {
    userId: '123456789',
    transactionId: '123509481238905611',
    amount: 200,
    description: 'Total exp on food',
    transactionDate: new Date(),
    createdAt: new Date(),
    walletId: '1',
    categoryId: '1'
  },
  {
    userId: '123456789',
    transactionId: '776168253838905611',
    amount: 115,
    description: 'Total exp on transportation',
    transactionDate: new Date(),
    createdAt: new Date(),
    walletId: '1',
    categoryId: '2'
  },
  {
    userId: '123456789',
    transactionId: '90412768253838905611',
    amount: 375,
    description: 'Pokemon Cards',
    transactionDate: new Date(),
    createdAt: new Date(),
    walletId: '1',
    categoryId: '3'
  }
];

const IncomesCollection = [
  {
    userId: '987654321',
    transactionId: '998877665544332211',
    walletId: '1',
    categoryId: '2',
    amount: 100,
    description: 'lorem ipsum',
    transactionDate: new Date(),
    createdAt: new Date()
  },
  {
    userId: '123456789',
    transactionId: '12385610123712384',
    walletId: '1',
    categoryId: '2',
    amount: 2500,
    description: 'lorem ipsum',
    transactionDate: new Date(),
    createdAt: new Date()
  },
  {
    userId: '123456789',
    transactionId: '1238513483712194',
    walletId: '2',
    categoryId: '2',
    amount: 500,
    description: 'lorem ipsum',
    transactionDate: new Date(),
    createdAt: new Date()
  },
  {
    userId: '123456789',
    transactionId: '1238134890912194',
    walletId: '3',
    categoryId: '2',
    amount: 3000,
    description: 'lorem ipsum',
    transactionDate: new Date(),
    createdAt: new Date()
  },
  {
    userId: '123456789',
    transactionId: '124569012339912194',
    walletId: '4',
    categoryId: '2',
    amount: 700,
    description: 'lorem ipsum',
    transactionDate: new Date(),
    createdAt: new Date()
  }
];

const WalletTransfersCollection = [
  {
    userId: '987654321',
    transferId: '998877665544332211',
    amount: 500,
    transferDate: new Date(),
    createdAt: new Date(),

    // Necessary wallet details will also be embedded just in case that particular wallet will be deleted
    fromWallet: {
      id: '1',
      name: 'Cash',
      color: '#7C3AED',
      createdAt: new Date()
    },
    toWallet: {
      id: '2',
      name: 'GCash',
      color: '#2994FC',
      createdAt: new Date()
    }
  },
  {
    userId: '123456789',
    transferId: '998877665544332211',
    amount: 1000,
    transferDate: new Date(),
    createdAt: new Date(),
    fromWallet: {
      id: '3',
      name: 'Savings',
      color: '#21C5E0',
      createdAt: new Date()
    },
    toWallet: {
      id: '1',
      name: 'Cash',
      color: '#2994FC',
      createdAt: new Date()
    }
  }
];

export {
  UsersCollection,
  ExpensesCollection,
  IncomesCollection,
  WalletTransfersCollection
};

type User = (typeof UsersCollection)[number];
type Expense = (typeof ExpensesCollection)[number];
type Income = (typeof IncomesCollection)[number];
type WalletTransfer = (typeof WalletTransfersCollection)[number];

export type { User, Expense, Income, WalletTransfer };
