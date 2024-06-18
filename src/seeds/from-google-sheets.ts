import { authenticateGoogleAPI } from '@/helpers/authenticate-google-api';

export const seedFromGoogleSheets = async () => {
  await authenticateGoogleAPI();
  console.log('seeding....');
};
seedFromGoogleSheets();
