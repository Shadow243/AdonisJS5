import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await User.createMany([
      {
        phone: '+243993002040',
        password: 'rootroot',
        name: 'Steven ngesera'
      },
      {
        phone: '+243854323391',
        password: 'rootroot',
        name: 'Shadow Codes'
      }
    ])
  }
}
