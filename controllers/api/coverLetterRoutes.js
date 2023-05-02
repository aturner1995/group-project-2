const router = require('express').Router();
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');
const { User, Person, Overview, Certification, Education, Project, Skill, Work, AiOverview, AiWork } = require('../../models');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/generate', async (req, res) => {

    try {
        // Find resume data for the user from the DB
        const resumeData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Person }, { model: Overview }, { model: Certification }, { model: Education }, { model: Skill }, { model: Work }, { model: Project }
            ]
        });

        const prompt = `Generate a cover letterbased on the following information:
        Job Experience:             
            ${resumeData.Works.map((work, index) => `\n${index + 1}) Title:${work.title}, Company:${work.company}, Responsibility ${work.responsibility}`)}
        """\nPlease rewrite the cover letter in a way that highlights the candidate's skills and experience, and adheres to best practices for resume writing. Please sign it with the name ${resumeData.people[0].name}`
        
        // OPEN AI API call
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
            temperature: 0.2,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
    
        // Create a new PDF document
        const pdfDoc = new PDFDocument();
    
        // Set the PDF document to be downloaded as a file
        res.type('application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="coverletter.pdf"');
    
        pdfDoc.fontSize(12).text(response.data.choices[0].message.content);
    
        // Pipe the PDF document to the response object and end the response
        const filePath = path.join(__dirname, '../../public/coverletter.pdf')
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.end();
    
        res.status(200).send('PDF saved to file system.');
    }
    catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;