import createEngine from './create';
import retrieveEngine from './retrieve';
import listEngine from './list';
import deleteEngine from './delete';

const engines = {
  create: createEngine,
  retrieve: retrieveEngine,
  list: listEngine,
  delete: deleteEngine
};

export default engines;
