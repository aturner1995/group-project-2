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
    // Generate the resume with the user information
    const response = await fetch(`api/resume/generate/${selectedTemplate}?color=${selectedColor}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/pdf' }
    })

    if (response.ok) {

        // Update the user professional summary with AI API
        const aiResponse = await fetch('/api/ai/overview', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        // If the overview is updated the AI resume is generated
        if (aiResponse.ok) {
            const aiResumeResponse = await(fetch(`api/resume/ai/generate/${selectedTemplate}?color=${selectedColor}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/pdf' }
            }))
            if (aiResumeResponse.ok) {
                document.location = '/resume'
            }
            else {
                alert('Failed to updated resume with AI');
            }
        }
        else {
            alert('Failed to update professional summary with AI');
        }
    }
    else {
        alert('Failed to create Resume');
    }
};

document.querySelector('.gen-resume').addEventListener('click', generateResume);

const editBtn = document.querySelector('.edit-btn');
const uploadForm = document.querySelector('#upload-form');

editBtn.addEventListener('click', (event) => {
  event.preventDefault();
  uploadForm.classList.toggle('hidden');
});
