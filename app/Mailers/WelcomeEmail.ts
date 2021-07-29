import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class WelcomeEmail extends BaseMailer {

  constructor (private user: User, private body: string) {
    super()
  }

  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  public mailer = this.mail.use('smtp')

  /**
   * The prepare method is invoked automatically when you run
   * "WelcomeEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .subject('APPNAME - Welcome Onboard !')
      .from('contact@myapp.com')
      .to(this.user.email)
      .htmlView('emails/welcome', { user: this.user, message: this.body, title: "Welcome Onboard !" })
  }
}
