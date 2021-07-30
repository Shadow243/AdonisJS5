import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'


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

      // Lookup user manually
      const user = await User
        .query()
        .where('phone', phone)
        .firstOrFail()

      // Verify password
      if (!(await Hash.verify(user.password, password))) {
        return response.badRequest('Invalid credentials')
      }

      // Generate token
      const token = await auth.use('api').generate(user, {
        expiresIn: '7days'
      })

      return token
      
    } catch (error) {
      return response.badRequest(error)
    }
  }
}