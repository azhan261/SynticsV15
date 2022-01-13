const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//Importing the employee schema

var { PaymentSchema } = require('../../models/Payments Schema/PaymentSchema')

 //Now to use router.ger to use properties of the schema like find collection, post collection, etc

 //To use this post requeest we need to type https://syntics.co/employees/, this is coming from index.js 
 //Where its mentioned /employees is the router
/*
 router.post('/', (req, res) => {
    PaymentSchema.find((err, doc) => {
         if (!err) { res.send(doc); }
         else { console.log('Error in Retrieving Answerss :' + JSON.stringify(err, undifines, 2)); }
     });

 });
 */
 router.post('/', (req, res) => {
  console.log("api hit")
  PaymentSchema.find((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retrieving Blog :' + JSON.stringify(err, undifines, 2)); }
  });

});

 router.post('/projectStartDate', (req, res) => {
  PaymentSchema.find({ projectStartDate: req.body.projectStartDate },(err, doc) => {
    console.log("api hit")
    if (!err) { console.log(doc)
      res.send(doc); }
    else { console.log('Error in Retrieving Answerss :' + JSON.stringify(err, undifines, 2)); }
  })
});




 //Making a route to post the values related to a specific id, keep in mind, this id is not the id a user gives
 //but an ID mongoDB sets its self for specific entries in the database.

 
 //Making a route to post the data with post rquest.

 //It should be noted that for now, we will be implementing

 router.post('/create', (req, res) => {
     var emp = new PaymentSchema({

        studentName:req.body.studentName,
        studentID:req.body.studentID,
        payableAmount: req.body.payableAmount,
        amountPaid: req.body.amountPaid,
        month: req.body.month,
        datePaid:req.body.datePaid,
        dueDate: req.body.dueDate,
        status: req.body.status,
        
     });
     //Calling save function from mongoose, it will call back a function which will return a mongoDB object with above fields and properties
     //There will be another property called _id which will be used to fetch a particular data by mongoDB


     emp.save((err, doc) => {
         //Checking for error
         //if (!err) { res.send(doc);}
         //else {console.log('Error in PaymentSchema Save :' + JSON.stringify(err, undefined, 2)); }
     });

 });

 //Building router for updating with router.put


 router.post('/specific/:id', (req, res) => {
  const id = req.params.id;
  console.log(id)
  console.log("test")
  PaymentSchema.find({ "studentID" : id} , (err, student) => {
    res.json(student);
  });
}); 


router.post('/specific/subject/:id&:coursetype', (req, res) => {
  const id = req.params.id;
  const coursetype = req.params.coursetype;
  console.log(id, coursetype, "test")
  PaymentSchema.find({ "studentId" : id, "coursetype" : coursetype} , (err, student) => {
    res.json(student);
  });
}); 

router.post("/specific/question/:questionId", (req, res) => {
  console.log("api hit here")
  const questionId = req.params.questionId;
  console.log(questionId)
  PaymentSchema.find({ "questionId" : questionId} , (err, student) => {
    res.json(student);
  });
}); 


 router.post("/:id", (req, res) => {
    const id = req.params.id;
    PaymentSchema.findById(id, (err, payment) => {
      if (!payment) {
        res.status(404).send("question not found");
      } else {

        payment.studentName = req.body.studentName,
        payment.studentID = req.body.studentID,
        payment.payableAmount = req.body.payableAmount,
        payment.amountPaid = req.body.amountPaid,
        payment.month = req.body.month,
        payment.datePaid = req.body.datePaid,
        payment.dueDate = req.body.dueDate,
        payment.status = req.body.status,
        payment
          .save()
          .then((payment) => {
            res.json(payment);
          })
          .catch((err) => res.status(500).send(err.message));
      }
    });
  });


 //Building a delete router for delete request. The delete request is called through req,res function


 router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    PaymentSchema.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Answerss Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;


 //We have to configure these routes in the root file which is index.js


