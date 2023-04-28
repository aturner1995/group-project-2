const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    // If successful, redirect the browser to the home page
    if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
}

// Collect values from the logout button
document.querySelector('#logout').addEventListener('click', logout);