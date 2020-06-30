const Flight = require('../models').Flight;
module.exports = {
    create(req,res){
        return Flight
        .create({
            origin: req.body.origin,
            destination: req.body.destination,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            airline_name: req.body.airline_name,
            flight_number: req.body.flight_number,
            price: req.body.price,
            badge_price: req.body.badge_price,
            tripID: req.body.tripID
        })
        .then(data => res.status(201).send(data))
        .catch(error => res.status(400).send(error))
    },
    findAll(req, res){
        Flight.findAll({attributes: [`id`, `origin`, `destination`, `start_date`, `end_date`, `airline_name`, `flight_number`, `price`, `tripID`] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(400).send(error))
    },
    findOne(req, res){
        const id = req.params.id;
        Flight.findByPk(id, {attributes: [`id`, `origin`, `destination`, `start_date`, `end_date`, `airline_name`, `flight_number`, `price`, `tripID`] })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error))
    },
    update(req,res){
        const id = req.params.id;
        Flight.update(req.body, { where: { id: id }} )
        .then(num => {
            if (num == 1) {
                res.send({message: "Flight was updated successfully."});
            } else {
                res.send({message: `Cannot update Flight with id=${id}. Maybe Flight was not found or req.body is empty!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Error updating Tutorial with id=" + id});});
    },
    delete(req,res){
        const id = req.params.id;
        Flight.destroy({where: { id: id }})
        .then(num => {
            if (num == 1) {
                res.send({message: "Flight was deleted successfully!"});
            } else {
                res.send({message: `Cannot delete Flight with id=${id}. Maybe Flight was not found!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Could not delete Flight with id=" + id});});
    }
}