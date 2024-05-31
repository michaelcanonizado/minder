const usersCollection = [
  {
    id: '123456789',
    firstName: 'michael',
    lastName: 'canonizado',
    email: 'michael@gmail.com',
    phone: '0123456789',
    gender: '',
    createdAt: new Date(),
    lastLogin: new Date(),
    timezone: {},
    currency: {
      name: 'PHP',
      htmlCode: '&#8369',
      hexCode: '&#x20B1;',
      uniCode: 'U+020B1'
    },
    balance: 0,
    categories: {
      expense: [
        {
          id: '1',
          name: 'Food',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '2',
          name: 'Transportation',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '3',
          name: 'Shopping',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '4',
          name: 'Phone',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '5',
          name: 'Housing',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '6',
          name: 'Education',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '7',
          name: 'Entertainment',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '8',
          name: 'Other',
          createdAt: new Date(),
          icon: ''
        }
      ],
      income: [
        {
          id: '1',
          name: 'Salary',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '2',
          name: 'Allowance',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '3',
          name: 'Investments',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '4',
          name: 'Business',
          createdAt: new Date(),
          icon: ''
        },
        {
          id: '5',
          name: 'Other',
          createdAt: new Date(),
          icon: ''
        }
      ]
    },
    wallets: [
      {
        id: '1',
        name: 'Cash',
        color: '#7C3AED',
        balance: 0,
        createdAt: new Date(),
        transactionCount: 0
      },
      {
        id: '2',
        name: 'GCash',
        color: '#2994FC',
        balance: 0,
        createdAt: new Date(),
        transactionCount: 0
      },
      {
        id: '3',
        name: 'Savings',
        color: '#21C5E0',
        balance: 0,
        createdAt: new Date(),
        transactionCount: 0
      },
      {
        id: '4',
        name: 'Paypal',
        color: '#F23E94',
        balance: 0,
        createdAt: new Date(),
        transactionCount: 0
      }
    ]
  }
];

const expensesCollection = [
  {
    userId: '987654321',
    transactionId: '998877665544332211',

    // Necessary wallet and category details will be embedded just in case that wallet/category will be deleted
    wallet: {
      id: '1',
      name: 'Cash',
      color: '#7C3AED',
      balance: 0,
      createdAt: new Date(),
      transactionCount: 0
    },
    category: {
      id: '4',
      name: 'Phone',
      createdAt: new Date()
    },

    amount: 100,
    description: 'lorem ipsum',
    transactionDate: new Date(),
    createdAt: new Date()
  }
];

const incomesCollection = [
  {
    userId: '987654321',
    transactionId: '998877665544332211',

    // Necessary wallet and category details will be embedded just in case that wallet/category will be deleted
    wallet: {
      id: '1',
      name: 'Cash',
      color: '#7C3AED',
      createdAt: new Date()
    },
    category: {
      id: '2',
      name: 'Salary',
      createdAt: new Date(),
      icon: ''
    },

    amount: 100,
    description: 'lorem ipsum',
    transactionDate: new Date(),
    createdAt: new Date()
  }
];

const walletTransfersCollection = [
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
  }
];
