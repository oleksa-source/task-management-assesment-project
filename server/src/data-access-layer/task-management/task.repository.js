const { Errors } = require('../util');

class TaskRepository {
  tableName = 'tasks';

  constructor(knexInstance) {
    this.database = knexInstance;
  }

  async findAll() {
    const entities = await this.database(this.tableName)
        .select('*');

    return Promise.resolve(entities);
  }

  async findAllPaginated({ page, pageSize }) {
    if (page < 1) {
      throw Error('Invalid argument exception. The page should be greater than 0')
    }
    const offset = (page - 1) * pageSize;

    const entities = await this.database(this.tableName)
        .select('*')
        .offset(offset)
        .limit(pageSize);

    return Promise.resolve(entities);
  }

  async findById(id) {
    const found = await this.database(this.tableName)
        .where('id', id)
        .first();
    if (found) {
      return Promise.resolve(found);
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }

  async create(entity) {
    const inserted = await this.database(this.tableName)
        .insert(entity)

    return Promise.resolve(inserted);
  }

  async update(entity) {
    const updated = await this.database(this.tableName)
        .where({ id: entity.id })
        .update({
          ...entity
        });

    return Promise.resolve(updated);
  }

  async deleteById(id) {
    const deleted = await this.database(this.tableName)
        .where({ id })
        .del();

    if (deleted) {
      return Promise.resolve();
    } else {
      return Promise.reject(Errors.ENTITY_NOT_FOUND);
    }
  }
}

module.exports = {
  TaskRepository
}