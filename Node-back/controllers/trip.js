const Trip = require('../models').Trip;
const Flight = require('../models').Flight;
const City = require('../models').City;
const Hotel = require('../models').Hotel;
const Cost = require('../models').Cost;
const Activity = require('../models').Activity;
module.exports = {
    create(req,res){
        return Trip
        .create({
            destination: req.body.destination,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            planning_file: req.body.planning_file,
            status: req.body.status,
            userID: req.body.userID
        })
        .then(trip => res.status(201).send(trip))
        .catch(error => res.status(400).send(error))
    },
    findAll(req, res){
        Trip.findAll({include: [{model: Flight, as: 'flights'},{model: City, as: 'cities',
        include: [{model: Hotel, as: 'hotels'},{model: Activity, as: 'activities'},{model: Cost, as: 'citycosts'}]}]},
        {attributes: [`id`, `destination`, `start_date`, `end_date`, `planning_file`, `status`, `createdAt`, `updatedAt`, `userID`] })
        .then(trips => res.status(200).json(trips))
        .catch(error => res.status(400).send(error))
    },
    findOne(req, res){
        const id = req.params.id;
        Trip.findByPk(id, {include: [{model: Flight, as: 'flights'},{model: City, as: 'cities',
        include: [{model: Hotel, as: 'hotels'},{model: Activity, as: 'activities'},{model: Cost, as: 'citycosts'}]}]},
        {attributes: [`id`, `destination`, `start_date`, `end_date`, `planning_file`, `status`, `createdAt`, `updatedAt`, `userID`]})
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
    },
    findAllByUser(req, res){
        Trip.findAll(
            {
                where: { userID: req.query.userID },
                include: [{model: Flight, as: 'flights'},{model: City, as: 'cities',
                include: [{model: Hotel, as: 'hotels'},{model: Activity, as: 'activities'},{model: Cost, as: 'citycosts'}]}],
                attributes: [`id`, `destination`, `start_date`, `end_date`, `planning_file`, `status`, `createdAt`, `updatedAt`, `userID`]
            }
        )
        .then(trips => res.status(200).json(trips))
        .catch(error => res.status(400).send(error))
    },
    findByTypeAndUser(req, res){
        Trip.findAll(
            {
                where: { status: req.query.status, userID: req.query.userID },
                attributes: [`id`, `destination`, `start_date`, `end_date`, `planning_file`, `status`, `createdAt`, `updatedAt`, `userID`],
                include: [{model: Flight, as: 'flights'},{model: City, as: 'cities', 
                include: [{model: Hotel, as: 'hotels'},{model: Activity, as: 'activities'},{model: Cost, as: 'citycosts'}]}]
            }
        )
        .then(trips => res.status(200).json(trips))
        .catch(error => res.status(400).send(error))
    }
}