module.exports = (router) => {
    
    const controller = require('../../controllers/user/post')

    router.route('/user').post(controller.post)

}