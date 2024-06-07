import mongoose from 'mongoose';

export const databaseConnect = async () => {
  mongoose
    .connect('mongodb://localhost:27017/minder-finance')
    .then(() => {
      console.log('Mongo connected!');
    })
    .catch(error => {
      console.log('Mongo failed to connect!');
      console.log(error);
    });
};
