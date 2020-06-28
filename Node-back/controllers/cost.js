const Cost = require('../models').Cost;
module.exports = {
    create(req,res){
        return Cost
        .create({
            name: req.body.name,
            total_price: req.body.total_price,
            cityID: req.body.cityID
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error))
    },
    findAll(req, res){
        Cost.findAll({attributes: [`id`, `name`, `total_price`, `createdAt`, `updatedAt`, `cityID`] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).send(error))
    },
    findOne(req, res){
        const id = req.params.id;
        Cost.findByPk(id, {attributes: [`id`, `name`, `total_price`, `createdAt`, `updatedAt`, `cityID`] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error))
    },
    update(req,res){
        const id = req.params.id;
        Cost.update(req.body, { where: { id: id }} )
        .then(num => {
            if (num == 1) {
                res.send({message: "Cost was updated successfully."});
            } else {
                res.send({message: `Cannot update Cost with id=${id}. Maybe Cost was not found or req.body is empty!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Error updating Tutorial with id=" + id});});
    },
    delete(req,res){
        const id = req.params.id;
        Cost.destroy({where: { id: id }})
        .then(num => {
            if (num == 1) {
                res.send({message: "Cost was deleted successfully!"});
            } else {
                res.send({message: `Cannot delete Cost with id=${id}. Maybe Cost was not found!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Could not delete Cost with id=" + id});});
    }
}