import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.dateTime('last_login_at');
      table
        .integer('country_id')
        .unsigned()
        .references('countries.id');
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('last_login_at')
      table.dropColumn('country_id')
    })
  }
}
