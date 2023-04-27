const router = require('express').Router();
const { Configuration, OpenAIApi } = require('openai');
const { Person, Overview, Certification, Education, Project, Skill, Work } = require('../../models');

require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);


router.get('/overview', async (req,res) => {
    try {

        const resumeData = await Person.findByPk(1, {
            include: [
                {model: Overview}, {model: Certification}, {model: Education}, {model: Skill}, {model: Work}, {model:Project}
            ]
        });

        const response = await openai.createCompletion({
            model: "text-ada-001",
            prompt: `
            Overview: ${resumeData.overview.text}
            """
            Rewrite this resume summary from the current overview by including at least three to five of the following: Title of role pursuing (do not identify as a student),Background experience that connects to the role you are pursuing, Two to three transferable skills, Years of related experience, Accomplishments, recognitions, and/or awards & Training or certificates `,
            temperature: 0,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        res.status(200).json({
            success: true,
            data: response.data
        });
    }
    catch(err) {
        res.status(400).json(err);
    }
});


router.get('/experience', async (req,res) => {
    try {

        const resumeData = await Person.findByPk(1, {
            include: [
                {model: Overview}, {model: Certification}, {model: Education}, {model: Skill}, {model: Work}, {model:Project}
            ]
        });

        const response = await openai.createCompletion({
            model: "text-ada-001",
            prompt: `
            Job Experience: 
            ${resumeData.Works.map(work => `\nTitle:${work.title}, Company:${work.company}, Responsibility ${work.responsibility}`)}
            """
            Rewrite all of my job experience's with bullet points with the format of Action + Task + Results. Seperate each job by a new line`,
            temperature: 0,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        res.status(200).json({
            success: true,
            data: response.data
        });
    }
    catch(err) {
        res.status(400).json(err);
    }
})

module.exports = router;