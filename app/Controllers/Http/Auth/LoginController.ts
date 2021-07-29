import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class LoginController {
  public async login({ auth, request, response }: HttpContextContract) {

    /**
 * Schema definition
 */
    const loginSchema = schema.create({
      phone: schema.string({ trim: true }),
      password: schema.string({ escape: true }),
    })


    try {
      /**
    * Validate request body against schema
    */
      const payload = await request.validate({ schema: loginSchema })

      const phone = request.input('phone')
      const password = request.input('password')


      const token = await auth.use('api').attempt(phone, password, {
        expiresIn: '7days'
      })

      return token
    } catch (error){
      return response.badRequest(error)
    }
  }
}