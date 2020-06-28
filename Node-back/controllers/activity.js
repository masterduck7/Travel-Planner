const Activity = require('../models').Activity;
module.exports = {
    create(req,res){
        return Activity
        .create({
            name: req.body.name,
            activity_date: req.body.activity_date,
            amount_paid: req.body.amount_paid,
            amount_not_paid: req.body.amount_not_paid,
            total_price: req.body.total_price,
            cityID: req.body.cityID
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error))
    },
    findAll(req, res){
        Activity.findAll({attributes: [`id`, `name`, `activity_date`, `amount_paid`, `amount_not_paid`, `total_price`, `createdAt`, `updatedAt`, `cityID`] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).send(error))
    },
    findOne(req, res){
        const id = req.params.id;
        Activity.findByPk(id, {attributes: [`id`, `name`, `activity_date`, `amount_paid`, `amount_not_paid`, `total_price`, `createdAt`, `updatedAt`, `cityID`] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error))
    },
    update(req,res){
        const id = req.params.id;
        Activity.update(req.body, { where: { id: id }} )
        .then(num => {
            if (num == 1) {
                res.send({message: "Activity was updated successfully."});
            } else {
                res.send({message: `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Error updating Tutorial with id=" + id});});
    },
    delete(req,res){
        const id = req.params.id;
        Activity.destroy({where: { id: id }})
        .then(num => {
            if (num == 1) {
                res.send({message: "Activity was deleted successfully!"});
            } else {
                res.send({message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Could not delete Activity with id=" + id});});
    }
}