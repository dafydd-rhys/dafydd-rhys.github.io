// Initialize EmailJS with your User ID
emailjs.init("RF_1XBsy4J6g_4ngx");

// Attach the event listener to the form's submit button
document.getElementById("submit-btn").addEventListener("click", function(event) {
  event.preventDefault();  // Prevent form submission
  
  // Collect data from form fields
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var comment = document.getElementById("comment").value;

  // Create the template parameters for the email
  var templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: comment
  };

  // Send the email using EmailJS
  emailjs.send("service_dafyddrhys", "template_dafyddrhys", templateParams)
    .then(function(response) {
      console.log("Email sent successfully", response);
      alert("Your message has been sent successfully.");
    })
    .catch(function(error) {
      console.error("Failed to send email", error);
      alert("Something went wrong. Please try again later.");
    });
});
