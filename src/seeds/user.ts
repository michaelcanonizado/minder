import { databaseConnect, databaseClose } from '@/helpers/database';

databaseConnect();
console.log('hello');
databaseClose();
