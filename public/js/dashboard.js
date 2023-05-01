const generateResume = async (event) => {
    event.preventDefault();
    // Show the spinner
    document.getElementById('spinner').style.display = 'block';
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
    // Generate AI Information
    const aiWorkResponse = await fetch(`api/ai/generate`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    // Generate AI Cover Letter
    const aiCoverResponse = await fetch(`api/coverletter/generate`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/pdf' }
    })
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
        if (response.ok) {
            const aiResumeResponse = await(fetch(`api/resume/ai/generate/${selectedTemplate}?color=${selectedColor}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/pdf' }
            }))
            if (aiResumeResponse.ok) {
                // Hide the spinner
                document.getElementById('spinner').style.display = 'none';
                document.location = '/resume'
            }
            else {
                document.location = '/resume'
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
    // Hide the spinner
    document.getElementById('spinner').style.display = 'none';
};


document.querySelector('.gen-resume').addEventListener('click', generateResume);

