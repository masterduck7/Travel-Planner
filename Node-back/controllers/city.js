const City = require('../models').City;
module.exports = {
    create(req,res){
        return City
        .create({
            name: req.body.name,
            country: req.body.country,
            map_link: req.body.map_link,
            tripID: req.body.tripID
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error))
    },
    findAll(req, res){
        City.findAll({include: ['hotels','citycosts','activities'], attributes: [`id`, `name`, `country`, `map_link`, `createdAt`, `updatedAt`, `tripID`] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).send(error))
    },
    findOne(req, res){
        const id = req.params.id;
        City.findByPk(id, {include: ['hotels','citycosts','activities'], attributes: [`id`, `name`, `country`, `map_link`, `createdAt`, `updatedAt`, `tripID`] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error))
    },
    update(req,res){
        const id = req.params.id;
        City.update(req.body, { where: { id: id }} )
        .then(num => {
            if (num == 1) {
                res.send({message: "City was updated successfully."});
            } else {
                res.send({message: `Cannot update City with id=${id}. Maybe City was not found or req.body is empty!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Error updating Tutorial with id=" + id});});
    },
    delete(req,res){
        const id = req.params.id;
        City.destroy({where: { id: id }})
        .then(num => {
            if (num == 1) {
                res.send({message: "City was deleted successfully!"});
            } else {
                res.send({message: `Cannot delete City with id=${id}. Maybe City was not found!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Could not delete City with id=" + id});});
    }
}