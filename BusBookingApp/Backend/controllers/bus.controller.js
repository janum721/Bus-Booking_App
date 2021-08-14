const mongoose = require('mongoose');
const Buses = mongoose.model('Buses');


module.exports.postBuses = (req, res, next) => {
    var bus = new Buses();
    bus.from = req.body.from;
    bus.to = req.body.to;
    bus.busType = req.body.busType;
    bus.departure = req.body.departure;
    bus.arrival = req.body.arrival;
    bus.totalSeats=req.body.totalSeats;
    bus.available = req.body.available;
    bus.fare = req.body.fare;
    bus.bookedSeats=req.body.bookedSeats;

    bus.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            //error handling
        }

    });
}



module.exports.getBuses = (req, res) => {
    Buses.find({from:req.body.from,to:req.body.to,available:{$gt:0}},(err,buses)=>{
        if(err){
            res.json({success:false,message:err});
        }
        else{
            if(!buses){
                res.json({success:false,message:'No bus found.'});
            }
            else{
                res.json({success:true,buses:buses});
            }
        }
    })
}

module.exports.updateDetails=(req,res)=>{
    if(!req.body.id){
        res.json({success:false,message:'No Bus id provided'});
    }
    else{
        Buses.findOne({_id:req.body.id},(err,buses)=>{
            if(err){
                res.json({success:false,message:'Not a valid bus id'});
            }
            else{
                buses.bookedSeats = buses.bookedSeats.concat(req.body.booked);
                buses.available=buses.totalSeats-buses.bookedSeats.length;
              
                buses.save((err)=>{
                    if(err){
                        res.json({success:false,messgae:err});
                    }
                    else{
                        res.json({success:true,message:'Bus updated'});
                    }
                });
            }
        });
    } 
}

