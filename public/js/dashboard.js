const generateResume = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/resume/generate', {
        method: 'GET',
        headers: {'Content-Type': 'application/pdf'}
    }) 
    
    if (response.ok) {
        document.location.replace('/resume');
    }
    else if (response.status === 403) {
        document.location = '/login';
    }
    else {
        alert('Failed to create resume');
    }
}

document.querySelector('.gen-resume').addEventListener('click', generateResume);