import mongoose from 'mongoose';

/**
 * Establishes a connection to mongoDB
 *
 * @returns void
 */
export const databaseConnect = async () => {
  if (mongoose.connection.readyState) {
    console.log('Databse already connected...');
    return;
  }

  try {
    await mongoose.connect('mongodb://localhost:27017/minder-finance');
    console.log('Database connected!');
  } catch (err) {
    console.log('Database failed to connect!');
    console.log(err);
  }

  return;
};

/**
 * Closes the connection to mongoDB
 *
 * @returns void
 */
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
