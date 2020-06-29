const UserModel = require('../../models').User;

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.username) {
            errors.push('Missing username field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

module.exports.isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findOne({where: {username: req.body.username}})
        .then((user)=>{
            if(!user.dataValues){
                res.status(404).send({});
            }else{
                let passwordFields = user.dataValues.password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user.dataValues._id,
                        email: user.dataValues.email,
                        username: user.dataValues.username,
                        country: user.dataValues.country,
                        visited_countries: user.dataValues.visited_countries
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid username or password']});
                }
            }
        })
        .catch(error => res.status(400).send(error))
 };