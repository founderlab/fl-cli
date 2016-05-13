
export default options =>
`import _ from 'lodash' // eslint-disable-line
import RestController from 'backbone-rest'
import {createAuthMiddleware} from 'fl-auth-server'

function canAccess(options, callback) {
  const {user, req} = options
  if (req.method === 'GET') return callback(null, true)
  if (!user) return callback(null, false)
  if (user.admin || user.get('admin')) return callback(null, true)
  callback(null, false)
}

export default class ${options.classPlural}Controller extends RestController {
  constructor(options) {
    super(options.app, _.defaults({
      model_type: require('../../models/${options.className}'),
      route: '/api/${options.plural}',
      auth: [...options.auth, createAuthMiddleware({canAccess})],
      whitelist: {

      },
    }, options))
  }
}
`
