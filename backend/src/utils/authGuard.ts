import User from '../models/userModel'

const isLoggedIn = (req: any, res: any, next: any) => {
  const basePath = req.path.split('/')[1]
  if ((req.session.user) || (req.path === '/pages/login.html') || (basePath === 'plugins') || (basePath === 'dist')) {
    if (req.session.user) {
      // If the request contains a session, check if the user is valid
      User.findOne({ email: req.session.user._json.email })
        .then((user) => {
          if (user) {
            // User is found in database
            next()
          } else {
            // Clear session and redirect to login page
            req.session = null
            res.writeHead(302, {
              Location: '/admin/pages/login.html'
            })
            res.end()
          }
        }).catch((error) => {
          console.log(error)
        })
    } else {
      next()
    }
  } else {
    res.writeHead(302, {
      Location: '/admin/pages/login.html'
    })
    res.end()
  }
}

export default isLoggedIn
