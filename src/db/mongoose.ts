import { connect } from 'mongoose';

/**
 * Para base de datos
 */
try {
  await connect('mongodb://127.0.0.1:27017/hiking-app');
  console.log('Connection to MongoDB server established');
} catch (error) {
  console.log(error);
}
