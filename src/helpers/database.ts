import mongoose from 'mongoose';

export const databaseConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/minder-finance');
    console.log('Database connected!');
  } catch (err) {
    console.log('Database failed to connect!');
    console.log(err);
  }

  return;
};

export const databaseClose = async () => {
  try {
    await mongoose.connection.close();
    console.log('Database connection closed!');
  } catch (err) {
    console.log('Error closing connection to the database!');
    console.log(err);
  }

  return;
};
