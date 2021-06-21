const express = require('express'); //Require packages
const app = express();


//Middleware
app.use(express.urlencoded({extended: false}));

//Custom Middleware
let count = 0;

app.use((req, res, next) => {
    count ++;
    console.log(`Request #${count}: ${req.method}`);
    next();
});

let students = [
    {id: 1, name: "John Wick", section: "Mathematics", gpa: 2.4, nationality: 'American'},
    {id: 2, name: "J Lo", section: "Literature", gpa: 3.5, nationality: 'Cuban'},
    {id: 3, name: "The Weeknd", section: "Science", gpa: 4.0, nationality: 'Spanish'},
    {id: 4, name: "Billy Bob", section: "Physics", gpa: 1.6, nationality: 'Australian'}
];

//Add Students
app.post("/add",function(req,res){
    let newStudent = req.body;
    students.push(newStudent);
    res.redirect('/');  //redirect to the main page
});

//Get Students
app.get("/",function(req,res){
    res.send(students);
});

//Get by ID
app.get("/id/:id", function(req,res){
    let id = parseInt(req.params.id);
    let index = students.findIndex((student) => {
        return student.id === id;})

res.send(students[index])});

//Get by section

app.get("/section/:section", function(req,res){
    let section = req.params.section;
    let index = students.findIndex((student) => {
        return student.section === section;})

    res.send(students[index])});


// Change all
app.put("/:id", function(req,res){
    let id = parseInt(req.params.id);
    let index = students.findIndex((student) => {
        return student.id === id;

    });
    students[index] = req.body;

    res.redirect('/');
});

// Change parts
app.patch("/:id", function(req,res){
    let id = parseInt(req.params.id);
    let index = students.findIndex((student) => {
        return student.id === id;

    });
    students[index] = req.body;

    res.redirect('/');
});


//Delete
app.delete('/:id',function(req,res){
    let id = parseInt(req.params.id);
    let index = students.findIndex((student) =>{
        return student.id === id;
    });

    students.splice(index,1);
    res.redirect('/');
});


//Server
app.listen(6000,function(){ 
    console.log("Server running on port 6000."); //server
});