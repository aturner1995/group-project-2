const generateResume = async (event) => {
    event.preventDefault();
    // Retrieve the selected color value
    const selectedColor = document.querySelector('input[name="color"]:checked').value;

    // Retrieve the selected template value
    const template = document.querySelector('input[name="template"]:checked').value;
    let selectedTemplate;
    if (template === 'template1') {
        selectedTemplate = 1;
    }
    else {
        selectedTemplate = 2;
    }

    const response = await fetch(`api/resume/generate/${selectedTemplate}?color=${selectedColor}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/pdf' }
    })

    if (response.ok) {
        document.location = '/resume';
    }
    else {
        alert('Failed to create Resume');
    }
};

document.querySelector('.gen-resume').addEventListener('click', generateResume)
