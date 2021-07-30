/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index')

Route.group(() => {
  Route.group(() => {
    Route.post('/login', 'Auth/LoginController.login')
    Route.post('/register', 'Auth/RegisterController.register')

    Route.group(() => {
      //posts toutes
      // Route.get('/posts', async (ctx) => {
      //   const { default: PostsController } = await import(
      //     'App/Controllers/Http/PostsController'
      //   )
      //   return new PostsController().index(ctx)
      // })
      Route.resource('/posts', 'PostsController').only(['index','store','show'])
      Route.get('/posts-user', 'PostsController.showAuthPosts')

    }).middleware('auth:api')
  }).prefix('/v1')
}).prefix('/api')

