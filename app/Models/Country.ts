import { DateTime } from 'luxon'
import {
  BaseModel, column, hasManyThrough,
  HasManyThrough
} from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import User from './User'

export default class Country extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasManyThrough([
    () => Post,
    () => User,
  ])
  public posts: HasManyThrough<typeof Post>

  @column()
  public name: string

  @column()
  public code: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
