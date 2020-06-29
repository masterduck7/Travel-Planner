const Trip = require('../models').Trip;
module.exports = {
    create(req,res){
        return Trip
        .create({
            destination: req.body.destination,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            planning_file: req.body.planning_file,
            status: req.body.status,
            total_cost: req.body.total_cost,
            userID: req.body.userID
        })
        .then(trip => res.status(201).send(trip))
        .catch(error => res.status(400).send(error))
    },
    findAll(req, res){
        Trip.findAll({include: ['flights','cities']},{attributes: [`id`, `destination`, `start_date`, `end_date`, `planning_file`, `status`, `total_cost`, `createdAt`, `updatedAt`, `userID`] })
        .then(trips => res.status(200).json(trips))
        .catch(error => res.status(400).send(error))
    },
    findOne(req, res){
        const id = req.params.id;
        Trip.findByPk(id, {include: ['flights','cities'], attributes: [`id`, `destination`, `start_date`, `end_date`, `planning_file`, `status`, `total_cost`, `createdAt`, `updatedAt`, `userID`]})
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error))
    },
    update(req,res){
        const id = req.params.id;
        Trip.update(req.body, { where: { id: id }} )
        .then(num => {
            if (num == 1) {
                res.send({message: "Trip was updated successfully."});
            } else {
                res.send({message: `Cannot update Trip with id=${id}. Maybe Trip was not found or req.body is empty!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Error updating Tutorial with id=" + id});});
    },
    delete(req,res){
        const id = req.params.id;
        Trip.destroy({where: { id: id }})
        .then(num => {
            if (num == 1) {
                res.send({message: "Trip was deleted successfully!"});
            } else {
                res.send({message: `Cannot delete Trip with id=${id}. Maybe Trip was not found!`});
            }
        })
        .catch(err => {res.status(500).send({message: "Could not delete Trip with id=" + id});});
    }
}