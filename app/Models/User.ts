import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import Profile from './Profile'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public phone: string

  @column()
  public active: boolean

  @column()
  public verified: boolean

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
