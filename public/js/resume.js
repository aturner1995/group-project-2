const generateResume = async (event) => {
    const response = await fetch('api/resume/generate', {
        method: 'GET',
        headers: {'Content-Type': 'application/pdf'}
    })

    if (response.ok) {
        const viewResponse = await fetch('api/resume/view', {
            method: 'GET',
            headers: {'Content-Type': 'application/pdf'}
        })

        if (viewResponse.ok) {
            document.location.reload();
        }
        else {
            alert('Failed to view Resume');
        }
    }
    else {
        alert('Failed to create Resume');
    }
};

const downloadResume = async (event) => {
    const response = await fetch('/api/resume/download', {
        method: 'GET',
        headers: {'Content-Type': 'application/pdf'}
    })

    if (response.ok) {
        document.location.reload();
    }
    else {
        alert('Failed to view Resume');
    }
};

document.querySelector('.view-resume').addEventListener('click', generateResume);
document.querySelector('.download').addEventListener('click', downloadResume);