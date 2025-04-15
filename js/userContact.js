document.getElementById('form').addEventListener('submit', function(event) {

    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    let emailData = {
        name: document.getElementById('to_name').value,
        emailAddress: document.getElementById('from_name').value,
        description: document.getElementById('message').value
    };

    fetch('/send-email/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
    })
        .then(response => response.json())
        .then(data => {
            alert('Email sent successfully: ' + data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


function validateForm() {
    var name = document.getElementById("to_name");
    var email = document.getElementById("from_name");
    var message = document.getElementById("message");

    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var messageError = document.getElementById("messageError");
    var successMessage = document.getElementById("successMessage");

    nameError.innerHTML = "";
    emailError.innerHTML = "";
    messageError.innerHTML = "";
    successMessage.innerHTML = "";

    var valid = true;

    // Name validation
    if (name.value.trim() === "") {
        nameError.innerHTML = "Name is required.";
        valid = false;
    }

    // Email validation
    if (email.value.trim() === "") {
        emailError.innerHTML = "Email is required.";
        valid = false;
    } else if (!validateEmail(email.value)) {
        emailError.innerHTML = "Invalid email format.";
        valid = false;
    }

    // Message validation
    if (message.value.trim() === "") {
        messageError.innerHTML = "Message is required.";
        valid = false;
    }

    // Show success message if form is valid
    if (valid) {
        successMessage.innerHTML = "Message sent successfully!";
    }

    return valid;
}

// Email format validation
function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}