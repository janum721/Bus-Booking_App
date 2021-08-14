const mongoose= require('mongoose');

var busSchema= new mongoose.Schema({
    from:{type:String},
    to:{type:String},
    busType:{type:String},
    departure:{type:String},
    arrival:{type:String},
    totalSeats:{type:Number},
    available:{type:Number},
    fare:{type:String},
    bookedSeats:{type:Array}
    
});

mongoose.model('Buses',busSchema);