import createEngine from './create';
import retrieveEngine from './retrieve';
import listEngine from './list';

const engines = {
  create: createEngine,
  retrieve: retrieveEngine,
  list: listEngine
};

export default engines;
