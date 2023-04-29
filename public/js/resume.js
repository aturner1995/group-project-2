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

    // Do something with the selected values (e.g., send an AJAX request to the server)
    console.log(selectedColor, selectedTemplate);

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

// const downloadResume = async (event) => {
//     const response = await fetch('/api/resume/download', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/pdf' }
//     })

//     if (response.ok) {
//         document.location.reload();
//     }
//     else {
//         alert('Failed to view Resume');
//     }
// };

// document.querySelector('.view-resume').addEventListener('click', generateResume);
// document.querySelector('.download').addEventListener('click', downloadResume);

// Select the form element
const form = document.querySelector('.card').addEventListener('submit', generateResume)