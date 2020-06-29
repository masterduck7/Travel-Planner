const User = require('../models').User;
const Trip = require('../models').Trip;
const Flight = require('../models').Flight;
module.exports = {
    create(req,res){
        let salt = crypto.randomBytes(16).toString('base64')
        let hash = crypto.createHmac('sha512',salt)
                                            .update(req.body.password)
                                            .digest("base64")
        let password = salt + "$" + hash
        return User
        .create({
            username: req.body.username,
            password: password,
            email: req.body.email,
            country: req.body.country,
            visitedCountries: req.body.visitedCountries
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error))
    },
    findAll(req, res){
        User.findAll({include: ['trips']})
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).send(error))
    },
    findOne(req, res){
        const id = req.params.id;
        User.findByPk(id, {include: ['trips']})
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error))
    },
    update(req,res){
        const id = req.params.id;
        User.update(req.body, { where: { id: id }} )
        .then(num => {
            if (num == 1) {
                res.send({message: "User was updated successfully."});
            } else {
                res.send({message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Error updating Tutorial with id=" + id});});
    },
    delete(req,res){
        const id = req.params.id;
        User.destroy({where: { id: id }})
        .then(num => {
            if (num == 1) {
                res.send({message: "User was deleted successfully!"});
            } else {
                res.send({message: `Cannot delete User with id=${id}. Maybe User was not found!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Could not delete User with id=" + id});});
    }
}