const jwt = require('jsonwebtoken');
const config = require('../config/database')
const Booking = require('../models/Booking')

module.exports = (router) => {

    router.post('/book', (req, res) => {
        if(!req.body.name){
            res.json({success: false, message: 'name is required'});
        }else{
            if(!req.body.email){
                res.json({success: false, message: 'email is required'});
            }else{
                if(!req.body.phone){
                    res.json({success: false, message: 'phone number is required'});
                }else{
                    if(!req.body.address){
                        res.json({success: false, message: 'address is required'});
                    }else{
                        if(!req.body.arrival){
                            res.json({success: false, message: 'arrival date is required'});
                        }else{
                            if(!req.body.departure){
                                res.json({success: false, message: 'departure date is required'});
                            }else{
                                if(!req.body.adults){
                                    res.json({success: false, message: 'number of adult is required'});
                                }else{
                                    if(!req.body.children){
                                        res.json({success: false, message: 'number of child is required'});
                                    }else{
                                        if(!req.body.condition)
                                        {
                                            res.json({success: false, message: 'condition is required'});
                                        }else{
                                            const book = new Booking({
                                                name: req.body.name,
                                                email: req.body.email,
                                                phone: req.body.phone,
                                                address: req.body.address,
                                                arrival: req.body.arrival,
                                                departure: req.body.departure,
                                                adults: req.body.adults,
                                                children: req.body.children,
                                                condition: req.body.condition
                                            });
                                            book.save((err) => {
                                                if(err){
                                                    console.log(err);
                                                    res.json({success: false, message: err});
                                                }else{
                                                    res.send({success: true, message: 'Booking done!'});
                                                }
                                            })
                                        }
                                       
                                    }
                                }
                            }
                        }
                    }
                }                
            }

        }
    })

    return router;
};
