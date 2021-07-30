import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Application from '@ioc:Adonis/Core/Application'

// import cloudinary from 'cloudinary'

export default class PostsController {
  public async index({ request }: HttpContextContract,) {
    // const posts = (await Post.query().withScopes((scopes) => scopes.published()));
    const page = request.input('page', 1) ?? 1
    const limit = request.input('limit', 1) ?? 10

    const posts = await Database.from('posts').paginate(page, limit)
    return posts;
  }

  public async show({ params }: HttpContextContract) {
    const id = params.id
    const post = await Post.query().withScopes((scopes) => scopes.published()).where('id', id).preload('user').first();

    return post;
  }

  public async showAuthPosts({ auth }: HttpContextContract) {
    // await auth.use('api').authenticate()
    // Lazy load the posts
    // const authUserData = await user?.load('posts');

    const posts = await auth.use('api').user?.related('posts').query().withScopes((scopes) => scopes.published()).paginate(1, 10)

    return posts;
  }

  public async store({ request, auth }: HttpContextContract) {
    //validate before
    await request.validate(CreatePostValidator);

    const user = await auth.authenticate();

    let image = request.file('image');
    if (!image) {
      return
    }
    const post = new Post();

    if (image) {
      //rename file  ex: ckrpp133u0001qbinawutgh0m.jpg
      const fileName = `${cuid()}.${image.extname}`

      //then upload
      await image.move(Application.tmpPath('uploads'), {
        name: fileName,
      })

      // cloudinary.v2.uploader.upload(image, {width: 70, height: 53, crop: "scale"},(error, result) => {
      //   console.log("ERROR:", error);
      //   console.log("RESULT:", result);
      // })

      post.image = fileName
    }

    post.title = request.input('title');
    post.content = request.input('content');

    await user.related('posts').save(post)

    return {
      data: post,
      message: 'Enregistrement reussi'
    }

  }

}
