const router = require('express').Router();
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const { User, Person, Overview, Certification, Education, Project, Skill, Work, AiOverview, AiWork } = require('../../models');

// View the resume for the client
router.get('/view', (req, res) => {
    const fileURL = '/resume.pdf';
    res.render('resume', { pdfURL: fileURL });
});

// Download the resume from the file system for the user
router.get('/download', (req, res) => {
    try {
        const file = 'public/resume.pdf';

        fs.readFile(file, (err, data) => {
            if (err) {
                res.status(500).json({ "message": "Internal Server Error" });
                return;
            }
            console.log(data)
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
            res.status(200).send(data);
        })
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// Generate the PDF Document for download
router.get('/generate/1', async (req, res) => {
    try {
        const headerColor = req.query.color;

        const resumeData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Person }, { model: Overview }, { model: Certification }, { model: Education }, { model: Skill }, { model: Work }, { model: Project }
            ]
        });

        // Filter Skill Data for skill section
        const languagesSkills = resumeData.skills.filter((skill => skill.level === 'language'));
        const toolSkills = resumeData.skills.filter((skill => skill.level === 'tool'));
        const applicationSkills = resumeData.skills.filter((skill => skill.level === 'application'));
        const nonTechSkills = resumeData.skills.filter((skill => skill.level === 'nonTech'));

        // Create a new PDF document
        const pdfDoc = new PDFDocument();

        // Set the PDF document to be downloaded as a file
        res.type('application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');

        // Add the content to the PDF document
        pdfDoc.fontSize(20).fillColor(headerColor).text(resumeData.people[0].name, {
            align: 'center'
        });
        pdfDoc.fontSize(12).fillColor('black').text(`${resumeData.email} | ${resumeData.people[0].phone} | ${resumeData.people[0].address}`, {
            align: 'center'
        });
        pdfDoc.fontSize(12).text(`LinkedIn: ${resumeData.people[0].linkedin} | GitHub: ${resumeData.people[0].githubProfile} | Portfolio: ${resumeData.people[0].portfolio}`, {
            align: 'center'
        });
        pdfDoc.moveDown();
        pdfDoc.fontSize(12).text(resumeData.overviews[0].text, {
            align: 'left'
        });
        pdfDoc.moveDown();
        // Skills Section
        if (languagesSkills.length || toolSkills.length || applicationSkills.length || nonTechSkills.length) {
            pdfDoc.fontSize(16).fillColor(headerColor).text('Technical Skills');
            pdfDoc
                .strokeColor('gray', 0.5)
                .moveTo(70, pdfDoc.y)
                .lineTo(540, pdfDoc.y)
                .stroke();
            pdfDoc.moveDown();
            if (languagesSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Languages: ${languagesSkills.map((skill, index) => `${skill.name}${index === languagesSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (toolSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Tools: ${toolSkills.map((skill, index) => `${skill.name}${index === toolSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (applicationSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Applications: ${applicationSkills.map((skill, index) => `${skill.name}${index === applicationSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (nonTechSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Non-Tech Skills: ${nonTechSkills.map((skill, index) => `${skill.name}${index === nonTechSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            pdfDoc.moveDown();
        }
        // Project Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Projects');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.projects.map(project => {
            pdfDoc.fontSize(12).fillColor('black').text(`${project.projectName} | Repo: ${project.repo} | Deployed: ${project.deployment}`);
            pdfDoc.fontSize(12).text(project.yourRole)
            pdfDoc.fontSize(12).text(project.responsibility)
            pdfDoc.moveDown();
        })
        // Professional Experience Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Professional Experience');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.Works.map(exp => {
            const startYear = new Date(exp.startDate).getFullYear();
            const endYear = new Date(exp.endDate).getFullYear();
            pdfDoc.fontSize(12).fillColor('black').text(exp.company, { align: 'left', continued: true })
                .text(`${startYear} - ${endYear}`, { align: 'right' })
                .text(`${exp.title}`)
                .text(exp.responsibility);
            pdfDoc.moveDown();
        });
        pdfDoc.moveDown();
        // Education Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Education');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.education.map(edu => {
            const startYear = new Date(edu.startDate).getFullYear();
            const endYear = new Date(edu.endDate).getFullYear();
            pdfDoc.fontSize(12).fillColor('black').text(edu.school)
                .text(`${startYear} - ${endYear}`)
                .text(edu.degree)
                .text(edu.educationdetail);
            pdfDoc.moveDown();
        })

        // Pipe the PDF document to the response object and end the response
        const filePath = path.join(__dirname, '../../public/resume.pdf')
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.end();

        res.status(200).send('PDF saved to file system.');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Second Resume Template Generator
router.get('/generate/2', async (req, res) => {

    try {
        const headerColor = req.query.color;

        const resumeData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Person }, { model: Overview }, { model: Certification }, { model: Education }, { model: Skill }, { model: Work }, { model: Project }
            ]
        });

        // Filter Skill Data for skill section
        const languagesSkills = resumeData.skills.filter((skill => skill.level === 'language'));
        const toolSkills = resumeData.skills.filter((skill => skill.level === 'tool'));
        const applicationSkills = resumeData.skills.filter((skill => skill.level === 'application'));
        const nonTechSkills = resumeData.skills.filter((skill => skill.level === 'nonTech'));

        // Create a new PDF document
        const pdfDoc = new PDFDocument();

        // Set the PDF document to be downloaded as a file
        res.type('application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');

        // Add the content to the PDF document
        pdfDoc.fillColor(headerColor).rect(0, 0, 612, 135).fill();
        pdfDoc.fontSize(20).fillColor('white').text(resumeData.people[0].name, {
            align: 'center'
        });
        pdfDoc.fontSize(12).text(`${resumeData.email} | ${resumeData.people[0].phone} | ${resumeData.people[0].address}`, {
            align: 'center'
        });
        pdfDoc.fontSize(12).text(`LinkedIn: ${resumeData.people[0].linkedin} | GitHub: ${resumeData.people[0].githubProfile} | Portfolio: ${resumeData.people[0].portfolio}`, {
            align: 'center'
        });
        pdfDoc.moveDown();
        pdfDoc.fontSize(12).fillColor('black').text(resumeData.overviews[0].text, {
            align: 'left'
        });
        pdfDoc.moveDown();
        // Skills Section
        if (languagesSkills.length || toolSkills.length || applicationSkills.length || nonTechSkills.length) {
            pdfDoc.fontSize(16).fillColor(headerColor).text('Technical Skills');
            pdfDoc
                .strokeColor('gray', 0.5)
                .moveTo(70, pdfDoc.y)
                .lineTo(540, pdfDoc.y)
                .stroke();
            pdfDoc.moveDown();
            if (languagesSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Languages: ${languagesSkills.map((skill, index) => `${skill.name}${index === languagesSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (toolSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Tools: ${toolSkills.map((skill, index) => `${skill.name}${index === toolSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (applicationSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Applications: ${applicationSkills.map((skill, index) => `${skill.name}${index === applicationSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (nonTechSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Non-Tech Skills: ${nonTechSkills.map((skill, index) => `${skill.name}${index === nonTechSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            pdfDoc.moveDown();
        }
        // Project Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Projects');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.projects.map(project => {
            pdfDoc.fontSize(12).fillColor('black').text(`${project.projectName} | Repo: ${project.repo} | Deployed: ${project.deployment}`);
            pdfDoc.fontSize(12).text(project.yourRole)
            pdfDoc.fontSize(12).text(project.responsibility)
            pdfDoc.moveDown();
        })
        // Professional Experience Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Professional Experience');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.Works.map(exp => {
            const startYear = new Date(exp.startDate).getFullYear();
            const endYear = new Date(exp.endDate).getFullYear();
            pdfDoc.fontSize(12).fillColor('black').text(exp.company, { align: 'left', continued: true })
                .text(`${startYear} - ${endYear}`, { align: 'right' })
                .text(`${exp.title}`)
                .text(exp.responsibility);
            pdfDoc.moveDown();
        });
        pdfDoc.moveDown();
        // Education Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Education');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.education.map(edu => {
            const startYear = new Date(edu.startDate).getFullYear();
            const endYear = new Date(edu.endDate).getFullYear();
            pdfDoc.fontSize(12).fillColor('black').text(edu.school)
                .text(`${startYear} - ${endYear}`)
                .text(edu.degree)
                .text(edu.educationdetail);
            pdfDoc.moveDown();
        })

        // Pipe the PDF document to the response object and end the response
        const filePath = path.join(__dirname, '../../public/resume.pdf')
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.end();

        res.status(200).send('PDF saved to file system.');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/ai/generate/1', async (req, res) => {
    console.log('I get here')
    try {
        const headerColor = req.query.color;

        const resumeData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Person }, { model: AiOverview }, { model: Certification }, { model: Education }, { model: Skill }, { model: Work }, { model: Project }
            ]
        });

        // Filter Skill Data for skill section
        const languagesSkills = resumeData.skills.filter((skill => skill.level === 'language'));
        const toolSkills = resumeData.skills.filter((skill => skill.level === 'tool'));
        const applicationSkills = resumeData.skills.filter((skill => skill.level === 'application'));
        const nonTechSkills = resumeData.skills.filter((skill => skill.level === 'nonTech'));

        // Create a new PDF document
        const pdfDoc = new PDFDocument();

        // Set the PDF document to be downloaded as a file
        res.type('application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="ai-resume.pdf"');

        // Add the content to the PDF document
        pdfDoc.fontSize(20).fillColor(headerColor).text(resumeData.people[0].name, {
            align: 'center'
        });
        pdfDoc.fontSize(12).fillColor('black').text(`${resumeData.email} | ${resumeData.people[0].phone} | ${resumeData.people[0].address}`, {
            align: 'center'
        });
        pdfDoc.fontSize(12).text(`LinkedIn: ${resumeData.people[0].linkedin} | GitHub: ${resumeData.people[0].githubProfile} | Portfolio: ${resumeData.people[0].portfolio}`, {
            align: 'center'
        });
        pdfDoc.moveDown();
        pdfDoc.fontSize(12).text(resumeData.aioverviews[0].text, {
            align: 'left'
        });
        pdfDoc.moveDown();
        // Skills Section
        if (languagesSkills.length || toolSkills.length || applicationSkills.length || nonTechSkills.length) {
            pdfDoc.fontSize(16).fillColor(headerColor).text('Technical Skills');
            pdfDoc
                .strokeColor('gray', 0.5)
                .moveTo(70, pdfDoc.y)
                .lineTo(540, pdfDoc.y)
                .stroke();
            pdfDoc.moveDown();
            if (languagesSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Languages: ${languagesSkills.map((skill, index) => `${skill.name}${index === languagesSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (toolSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Tools: ${toolSkills.map((skill, index) => `${skill.name}${index === toolSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (applicationSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Applications: ${applicationSkills.map((skill, index) => `${skill.name}${index === applicationSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (nonTechSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Non-Tech Skills: ${nonTechSkills.map((skill, index) => `${skill.name}${index === nonTechSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            pdfDoc.moveDown();
        }
        // Project Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Projects');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.projects.map(project => {
            pdfDoc.fontSize(12).fillColor('black').text(`${project.projectName} | Repo: ${project.repo} | Deployed: ${project.deployment}`);
            pdfDoc.fontSize(12).text(project.yourRole)
            pdfDoc.fontSize(12).text(project.responsibility)
            pdfDoc.moveDown();
        })
        // Professional Experience Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Professional Experience');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.Works.map(exp => {
            const startYear = new Date(exp.startDate).getFullYear();
            const endYear = new Date(exp.endDate).getFullYear();
            pdfDoc.fontSize(12).fillColor('black').text(exp.company, { align: 'left', continued: true })
                .text(`${startYear} - ${endYear}`, { align: 'right' })
                .text(`${exp.title}`)
                .text(exp.responsibility);
            pdfDoc.moveDown();
        });
        pdfDoc.moveDown();
        // Education Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Education');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.education.map(edu => {
            const startYear = new Date(edu.startDate).getFullYear();
            const endYear = new Date(edu.endDate).getFullYear();
            pdfDoc.fontSize(12).fillColor('black').text(edu.school)
                .text(`${startYear} - ${endYear}`)
                .text(edu.degree)
                .text(edu.educationdetail);
            pdfDoc.moveDown();
        })

        // Pipe the PDF document to the response object and end the response
        const filePath = path.join(__dirname, '../../public/ai-resume.pdf')
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.end();

        res.status(200).send('PDF saved to file system.');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/ai/generate/2', async (req, res) => {
    console.log('I get here')

    try {
        const headerColor = req.query.color;

        const resumeData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Person }, { model: AiOverview }, { model: Certification }, { model: Education }, { model: Skill }, { model: Work }, { model: Project }
            ]
        });

        // Filter Skill Data for skill section
        const languagesSkills = resumeData.skills.filter((skill => skill.level === 'language'));
        const toolSkills = resumeData.skills.filter((skill => skill.level === 'tool'));
        const applicationSkills = resumeData.skills.filter((skill => skill.level === 'application'));
        const nonTechSkills = resumeData.skills.filter((skill => skill.level === 'nonTech'));

        // Create a new PDF document
        const pdfDoc = new PDFDocument();

        // Set the PDF document to be downloaded as a file
        res.type('application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');

        // Add the content to the PDF document
        pdfDoc.fillColor(headerColor).rect(0, 0, 612, 135).fill();
        pdfDoc.fontSize(20).fillColor('white').text(resumeData.people[0].name, {
            align: 'center'
        });
        pdfDoc.fontSize(12).text(`${resumeData.email} | ${resumeData.people[0].phone} | ${resumeData.people[0].address}`, {
            align: 'center'
        });
        pdfDoc.fontSize(12).text(`LinkedIn: ${resumeData.people[0].linkedin} | GitHub: ${resumeData.people[0].githubProfile} | Portfolio: ${resumeData.people[0].portfolio}`, {
            align: 'center'
        });
        pdfDoc.moveDown();
        pdfDoc.fontSize(12).fillColor('black').text(resumeData.aioverviews[0].text, {
            align: 'left'
        });
        pdfDoc.moveDown();
        // Skills Section
        if (languagesSkills.length || toolSkills.length || applicationSkills.length || nonTechSkills.length) {
            pdfDoc.fontSize(16).fillColor(headerColor).text('Technical Skills');
            pdfDoc
                .strokeColor('gray', 0.5)
                .moveTo(70, pdfDoc.y)
                .lineTo(540, pdfDoc.y)
                .stroke();
            pdfDoc.moveDown();
            if (languagesSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Languages: ${languagesSkills.map((skill, index) => `${skill.name}${index === languagesSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (toolSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Tools: ${toolSkills.map((skill, index) => `${skill.name}${index === toolSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (applicationSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Applications: ${applicationSkills.map((skill, index) => `${skill.name}${index === applicationSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            if (nonTechSkills.length) {
                pdfDoc.fontSize(12).fillColor('black').text('• ', { continued: true }).text(`Non-Tech Skills: ${nonTechSkills.map((skill, index) => `${skill.name}${index === nonTechSkills.length - 1 ? '' : ', '}`).join('')}`);
            }
            pdfDoc.moveDown();
        }
        // Project Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Projects');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.projects.map(project => {
            pdfDoc.fontSize(12).fillColor('black').text(`${project.projectName} | Repo: ${project.repo} | Deployed: ${project.deployment}`);
            pdfDoc.fontSize(12).text(project.yourRole)
            pdfDoc.fontSize(12).text(project.responsibility)
            pdfDoc.moveDown();
        })
        // Professional Experience Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Professional Experience');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.Works.map(exp => {
            const startYear = new Date(exp.startDate).getFullYear();
            const endYear = new Date(exp.endDate).getFullYear();
            pdfDoc.fontSize(12).fillColor('black').text(exp.company, { align: 'left', continued: true })
                .text(`${startYear} - ${endYear}`, { align: 'right' })
                .text(`${exp.title}`)
                .text(exp.responsibility);
            pdfDoc.moveDown();
        });
        pdfDoc.moveDown();
        // Education Section
        pdfDoc.fontSize(16).fillColor(headerColor).text('Education');
        pdfDoc
            .strokeColor('gray', 0.5)
            .moveTo(70, pdfDoc.y)
            .lineTo(540, pdfDoc.y)
            .stroke();
        pdfDoc.moveDown();
        resumeData.education.map(edu => {
            const startYear = new Date(edu.startDate).getFullYear();
            const endYear = new Date(edu.endDate).getFullYear();
            pdfDoc.fontSize(12).fillColor('black').text(edu.school)
                .text(`${startYear} - ${endYear}`)
                .text(edu.degree)
                .text(edu.educationdetail);
            pdfDoc.moveDown();
        })

        // Pipe the PDF document to the response object and end the response
        const filePath = path.join(__dirname, '../../public/resume.pdf')
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.end();

        res.status(200).send('PDF saved to file system.');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
