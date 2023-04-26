const router = require('express').Router();
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

// View the resume for the client
router.get('/view', (req, res) => {
    const fileURL = '/resume.pdf';
    res.render('resume', { pdfURL: fileURL });
});

// Download the resume from the file system for the user
router.get('/download', (req, res) => {
    const file = 'public/resume.pdf';

    fs.readFile(file, (err, data) => {
        if (err) {
            res.status(500).json({ "message": "Internal Server Error" });
            return;
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
        res.send(data);
    })
})


// Generate the PDF Document for download
router.get('/generate', (req, res) => {
    // Change later to collect data from the DB
    const data = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '506-555-1234',
        location: 'New Brunswick, Canada',
        summary: 'A highly skilled software engineer with over 5 years of experience in developing software applications. Proficient in a variety of programming languages including JavaScript, Python, and Java. A strong background in web development and has worked on several projects involving building and maintaining web applications. A quick learner and has a passion for staying up-to-date with the latest technologies and industry trends. An excellent team player and communicator, able to work collaboratively with colleagues and clients to achieve project goals.',
        experience: [
            { company: 'Acme Corp', position: 'Software Engineer', start: '2018', end: '2021', duties: ['I did this', 'And I did that'] },
            { company: 'XYZ Inc', position: 'Web Developer', start: '2016', end: '2018', duties: ['I did this', 'And I did that'] }
        ],
        education: [
            { company: 'Acme Corp', position: 'Software Engineer', start: '2018', end: '2021', duties: ['I did this', 'And I did that'] },
            { company: 'XYZ Inc', position: 'Web Developer', start: '2016', end: '2018', duties: ['I did this', 'And I did that'] }
        ],
        projects: [
            { name: 'Project Name', repo: "github url", deployment: 'deployed url', skills: ['HMTL', 'CSS'], summary: ['This', 'That'] },
            { name: 'Project Name 2', repo: "github url", deployment: 'deployed url', skills: ['HMTL', 'CSS'], summary: ['This', 'That'] }
        ],
        skills: [
            { languages: ['Javascript', 'CSS', 'HTML'], tools: ['jQuery', 'ReactJS'], apps: ['GitHub', 'MySql'], nonTech: ['Teamwork', 'Leadership'] }
        ]
    };

    // Create a new PDF document
    const pdfDoc = new PDFDocument();

    // Set the PDF document to be downloaded as a file
    res.type('application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');

    // Add the content to the PDF document
    pdfDoc.fontSize(20).text(data.name, {
        align: 'center'
    });
    pdfDoc.fontSize(14).text(`${data.email} | ${data.phone} | ${data.location}`, {
        align: 'center'
    });
    pdfDoc.fontSize(14).text(`LinkedIn: ${data.linkedin} | GitHub: ${data.github} | Portfolio: ${data.portfolio}`, {
        align: 'center'
    });
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text(data.summary, {
        align: 'left'
    });
    pdfDoc.moveDown();
    // Skills Section
    pdfDoc.fontSize(16).text('Technical Skills');
    pdfDoc
        .strokeColor('gray', 0.5)
        .moveTo(70, pdfDoc.y)
        .lineTo(540, pdfDoc.y)
        .stroke();
    pdfDoc.moveDown();
    data.skills.map(skillset => {
        pdfDoc.fontSize(12).text('• ', { continued: true }).text(`Languages: ${skillset.languages.map((skill, index) => `${skill}${index === skillset.languages.length - 1 ? '' : ', '}`).join('')}`);
        pdfDoc.fontSize(12).text('• ', { continued: true }).text(`Tools: ${skillset.tools.map((skill, index) => `${skill}${index === skillset.tools.length - 1 ? '' : ', '}`).join('')}`);
        pdfDoc.fontSize(12).text('• ', { continued: true }).text(`Applications: ${skillset.apps.map((skill, index) => `${skill}${index === skillset.apps.length - 1 ? '' : ', '}`).join('')}`);
        pdfDoc.fontSize(12).text('• ', { continued: true }).text(`Non-Tech Skills: ${skillset.nonTech.map((skill, index) => `${skill}${index === skillset.nonTech.length - 1 ? '' : ', '}`).join('')}`);
        pdfDoc.moveDown();
    })
    // Project Section
    pdfDoc.fontSize(16).text('Projects');
    pdfDoc
        .strokeColor('gray', 0.5)
        .moveTo(70, pdfDoc.y)
        .lineTo(540, pdfDoc.y)
        .stroke();
    pdfDoc.moveDown();
    data.projects.map(project => {
        pdfDoc.fontSize(12).text(`${project.name} | Repo: ${project.repo} | Deployed: ${project.deployment}`);
        project.summary.map(summary => {
            pdfDoc.fontSize(12).text('• ', { continued: true }).text(summary);
        })
        pdfDoc.fontSize(12).text('• ', { continued: true }).text(`Tools/Languages: ${project.skills.map((skill, index) => `${skill}${index === project.skills.length - 1 ? '' : ', '}`).join('')}`);
        pdfDoc.moveDown();
    })
    // Professional Experience Section
    pdfDoc.fontSize(16).text('Professional Experience');
    pdfDoc
        .strokeColor('gray', 0.5)
        .moveTo(70, pdfDoc.y)
        .lineTo(540, pdfDoc.y)
        .stroke();
    pdfDoc.moveDown();
    data.experience.map(exp => {
        pdfDoc.fontSize(12).text(exp.company, { align: 'left', continued: true })
            .text(`${exp.start} - ${exp.end}`, { align: 'right' })
            .text(`${exp.position}`);
        exp.duties.map(duty => {
            pdfDoc.fontSize(12).text('• ', { continued: true }).text(duty);
        })
        pdfDoc.moveDown();
    });
    pdfDoc.moveDown();
    // Education Section
    pdfDoc.fontSize(16).text('Education');
    pdfDoc
        .strokeColor('gray', 0.5)
        .moveTo(70, pdfDoc.y)
        .lineTo(540, pdfDoc.y)
        .stroke();
    pdfDoc.moveDown();
    data.education.map(edu => {
        pdfDoc.fontSize(12).text(edu.company)
            .text(`${edu.start} - ${edu.end}`)
            .text(edu.position);
        pdfDoc.moveDown();
    })

    // Pipe the PDF document to the response object and end the response
    const filePath = path.join(__dirname, '../../public/resume.pdf')
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.end();

    res.send('PDF saved to file system.');
});

module.exports = router;
