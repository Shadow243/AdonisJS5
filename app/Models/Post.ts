import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, scope } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Foreign key is still on the same model
  @column()
  public userId: number

  public static published = scope((query) => {
    query.where('published', 1)
    // query.where('publishedOn', '<=', DateTime.utc().toSQLDate())
  })

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
