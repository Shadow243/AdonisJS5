import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import WelcomeEmail from 'App/Mailers/WelcomeEmail'
import User from 'App/Models/User'

export default class RegisterController {
  public async register({ auth, request, response }: HttpContextContract) {

    /**
 * Schema definition
 */
    const registerSchema = schema.create({
      phone: schema.string({ trim: true }, [rules.required(), rules.unique({ table: 'users', column: 'phone' })]),
      email: schema.string({ trim: true }, [rules.required(), rules.unique({ table: 'users', column: 'email' }), rules.email()]),
      name: schema.string({ trim: true }, [rules.required()]),
      password: schema.string({ escape: true }, [rules.required(), rules.confirmed(), rules.minLength(6)]),
    })


    try {
      /**
    * Validate request body against schema
    */

      await request.validate({
        schema: registerSchema,
        reporter: validator.reporters.api, // 👈 using json reporter
        messages: {
          required: 'Le champ {{ field }} est requis',
          'phone.unique': 'Le numéro de téléphone est déjà utilisé',
          'email.unique': 'L\'email saisi est déjà utilisé',
          'minLength': 'Le champ {{ field }} est doit contenir minimum {{ options.minLength }}'
        }
      })

      const phone = request.input('phone')
      const password = request.input('password')
      const email = request.input('email')
      const name = request.input('name')

      /**
   * Find the user by email or create
   * a new one
   */
      const user = await User.create({
        email: email,
        name: name,
        phone: phone,
        password: password,
        active: true,
        verified: true
      })

      //and send welcome mail to user
      await new WelcomeEmail(user, "Vous venez de validé votre compte APP NAME; Pour commencer, vous devez définir votre profile.").sendLater()


      //the authenticate the user
      const token = await auth.use('api').attempt(user.phone, password, {
        expiresIn: '7days'
      })

      return token

    } catch (error) {
      return response.badRequest(error)
    }
  }
}