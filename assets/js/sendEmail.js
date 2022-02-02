//created a function that has the contract form as parameter passed by the html form
function sendMail(contacForm){
    //create an object with the values from the form
    //to be used as parameter for the emailJs method
    const formObj = {
        from_name: contacForm.name.value,
        project_request: contacForm.projectsummary.value,
        from_email: contacForm.emailaddress.value
    }

    //calling the emailJs function send
    //using then to wait fot the response
    emailjs.send("service_ogj7eze","project_request", formObj)
    .then(function(response){
        console.log("Sucess!!");
    }, function(error){
        console.log("Fail error: ", error.status);
    });
    return false;
}