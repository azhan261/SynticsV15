//Taking the router for express to use the GET, POST, HTTP methods.

const express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var ObjectId = require('mongoose').Types.ObjectId;

//Importing the employee schema

var { BatchSchema } = require('../../models/Batches/BatchSchema')



 //Now to use router.ger to use properties of the schema like find collection, get collection, etc

 //To use this get requeest we need to type https://syntics.co/employees/, this is coming from index.js 
 //Where its mentioned /employees is the router

 router.post('/', (req, res) => {
     BatchSchema.find((err, doc) => {
         if (!err) { res.send(doc); }
         else { console.log('Error in Retrieving Students :' + JSON.stringify(err, undifines, 2)); }
     });

 });
 
 //Making a route to get the values related to a specific id, keep in mind, this id is not the id a user gives
 //but an ID mongoDB sets its self for specific entries in the database.

 router.post('/login', (req, res) => {
     console.log(req)
    console.log("api hit")
    BatchSchema.findOne({ email: req.body.email })
       .then(user => {
           console.log("User from login hit", user)
           if (!user) {
           res.sendStatus(204);
           console.log("User name issue")
           }
           else {
               console.log("Password Issue")
               bcrypt.compare(req.body.password, user.password)
                   .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204)
                   )
           }
       });
});



//Making a route to post the data with post rquest.

//It should be noted that for now, we will be implementing

router.post('/create', (req, res) => {
    var emp = new BatchSchema({
        batchTitle: req.body.batchTitle,
        batchType: req.body.batchType,
        batchStartDate: req.body.batchStartDate,
        batchEndDate: req.body.batchEndDate,
        batchDescription: req.body.batchDescription,
        batchTeacherID: req.body.batchTeacherID,
        batchTeacherName: req.body.batchTeacherName,
        batchProjectManagerID: req.body.batchProjectManagerID,
        batchProjectManagerName: req.body.batchProjectManagerName,
    });
    //Calling save function from mongoose, it will call back a function which will return a mongoDB object with above fields and properties
    //There will be another property called _id which will be used to fetch a particular data by mongoDB


    emp.save((err, doc) => {
        //Checking for error
        //if (!err) { res.send(doc);}
        //else {console.log('Error in BatchSchema Save :' + JSON.stringify(err, undefined, 2)); }
    });

});

//Building router for updating with router.put
/*
router.put('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id))
       return res.status(400).send('No record with given id : ${req.param.id}');

   //Using an object to use the values of Employee and edit them, this object emp is different from Employee but uses its properties
   //emp object will be used to store the new values

   var emp = {
   
       name: req.body.name,
       email: req.body.email,
       gender: req.body.gender,
       dob: req.body.dob,
       country: req.body.country,
       country_code: req.body.country_code,
       contact: req.body.contact,
       password: req.body.password,
       conf_pass: req.body.conf_pass,
       status: req.body.status,
   };
   //Calling Employee to find and upodate, mongoose property
   // (err,doc) is a call back function in mongoose that we need to show err or put, fetch anything from doc
   //{ new: true } is used to tell which data we wish to send, setting new: true, will send the updated data to the doc

   BatchSchema.findByIdAndUpdate(req.params.id, { $set: emp}, { new: true }, (err, doc) =>{
       //Checking for errors
       //If error not found, sending response to the doc
       if(!err) {res.send(doc); }
       else { console.log('Error in Students Update :' + JSON.stringify(err, undefined, 2)); }
   });



});
*/
//Building a delete router for delete request. The delete request is called through req,res function
/*

router.delete('/:id', (req, res) => {
   if (!ObjectId.isValid(req.params.id))
       return res.status(400).send(`No record with given id : ${req.params.id}`);

   BatchSchema.findByIdAndRemove(req.params.id, (err, doc) => {
       if (!err) { res.send(doc); }
       else { console.log('Error in Students Delete :' + JSON.stringify(err, undefined, 2)); }
   });
});
*/


//Getting Specific Data



router.post("/specific/:email", (req, res) => {
    const email = req.params.email;
    console.log(email)
    BatchSchema.find({ "email" : email} , (err, student) => {
      res.json(student);
    });
}); 



/*
router.post('/', (req, res) => {
    console.log("api hit")
    Blog.find((err, doc) => {
      if (!err) { res.send(doc); }
      else { console.log('Error in Retrieving Blog :' + JSON.stringify(err, undifines, 2)); }
    });
  
  });
*/


/*
router.post('/specific/:id', (req, res) => {
   const id = req.params.email;
   BatchSchema.find({ "email" : "Female", "courses" : "School Junior" },(err, doc) => {
       if (!err) { res.send(doc); }
       else { console.log('Error in Retrieving BatchSchema :' + JSON.stringify(err, undifines, 2)); }
   });

});
*/


router.post("/:id", (req, res) => {
   console.log("got hit")
   const id = req.params.id;
   BatchSchema.findById(id, (err, student) => {
     if (!student) {
       res.status(404).send("student not found");
     } else {

       student.name = req.body.name,
       student.batchTitle = req.body.batchTitle,
       student.batchType = req.body.batchType,
       student.batchStartDate = req.body.batchStartDate,
       student.batchEndDate = req.body.batchEndDate,
       student.batchDescription = req.body.batchDescription,
       student.batchTeacherID = req.body.batchTeacherID,
       student.batchTeacherName = req.body.batchTeacherName,
       student.batchProjectManagerID = req.body.batchProjectManagerID,
       student.batchProjectManagerName = req.body.batchProjectManagerName,
       student
         .save()
         .then((student) => {
           res.json(student);
         })
         .catch((err) => res.status(500).send(err.message));
     }
   });
 });


 
 router.delete("/delete/:id", (req, res) => {
    var id = ObjectId(req.params.id)
    BatchSchema.findByIdAndRemove(id,(err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Blog :' + JSON.stringify(err, undifines, 2)); }
    });

});


module.exports = router;
