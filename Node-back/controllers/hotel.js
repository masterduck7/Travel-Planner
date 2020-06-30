const Hotel = require('../models').Hotel;
module.exports = {
    create(req,res){
        return Hotel
        .create({
            name: req.body.name,
            number_beds: req.body.number_beds,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            breakfast: req.body.breakfast,
            amount_paid: req.body.amount_paid,
            amount_not_paid: req.body.amount_not_paid,
            total_price: req.body.total_price,
            cityID: req.body.cityID
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error))
    },
    findAll(req, res){
        Hotel.findAll({attributes: [`id`, `name`, `number_beds`, `start_date`, `end_date`, `breakfast`, `amount_paid`, `amount_not_paid`, `total_price`, `createdAt`, `updatedAt`, `cityID`] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).send(error))
    },
    findOne(req, res){
        const id = req.params.id;
        Hotel.findByPk(id, {attributes: [`id`, `name`, `number_beds`, `start_date`, `end_date`, `breakfast`, `amount_paid`, `amount_not_paid`, `total_price`, `createdAt`, `updatedAt`, `cityID`] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error))
    },
    update(req,res){
        const id = req.params.id;
        Hotel.update(req.body, { where: { id: id }} )
        .then(num => {
            if (num == 1) {
                res.send({message: "Hotel was updated successfully."});
            } else {
                res.send({message: `Cannot update Hotel with id=${id}. Maybe Hotel was not found or req.body is empty!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Error updating Tutorial with id=" + id});});
    },
    delete(req,res){
        const id = req.params.id;
        Hotel.destroy({where: { id: id }})
        .then(num => {
            if (num == 1) {
                res.send({message: "Hotel was deleted successfully!"});
            } else {
                res.send({message: `Cannot delete Hotel with id=${id}. Maybe Hotel was not found!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Could not delete Hotel with id=" + id});});
    }
}