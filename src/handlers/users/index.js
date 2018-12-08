import createUserHandler from './create';
import retrieveUserHandler from './retrieve';
import userListHandler from './list';

const handlers = {
  create: createUserHandler,
  retrieve: retrieveUserHandler,
  list: userListHandler
};

export default handlers;
