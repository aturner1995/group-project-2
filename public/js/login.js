const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // Send a POST request to the API endpoint
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If successful, redirect the browser to the profile page
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            const responseData = await response.json();
            const errors = responseData.message;
            console.log(errors);
          
            const errorDiv = document.createElement("div");
            errorDiv.className = "alert alert-danger alert-dismissible fade show";
            errorDiv.innerHTML = `
              <strong>${errors}</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
          
            document.querySelector(".error-message").appendChild(errorDiv);
            setTimeout(function () {
              errorDiv.remove();
            }, 4000);
          }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log(username,email,password)
    // Send a POST request to the API endpoint
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If successful, redirect the browser to the profile page
        if (response.ok) {
            document.location.replace('/profile/new');
        }
        else {
            const responseData = await response.json();
            const errors = responseData.errors;
          
            const error_messages = {
              'Validation isEmail on email failed': 'The email address you entered does not seem to be valid. Please try again with a valid email address.',
              'Validation len on password failed' : "The password should be at least 8 characters in length",
              'email must be unique' : 'The email address you have entered is already registered. Please login or signup with a different email.'
            };
          
            for (let i = 0; i < errors.length; i++) {
              const errorDiv = document.createElement('div');
              errorDiv.className = 'alert alert-danger alert-dismissible fade show';
              const errorMessage = error_messages[errors[i].message] || errors[i].message;
              errorDiv.innerHTML = `
                <strong>${errorMessage}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              `;
              document.querySelector('.error-message').appendChild(errorDiv);
          
              setTimeout(function() {
                errorDiv.remove();
              }, 4000);
            }
          }
    }
}

// Collect values from the login & signup forms
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);