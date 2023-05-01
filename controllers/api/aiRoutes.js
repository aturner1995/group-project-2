const router = require('express').Router();
const { Configuration, OpenAIApi } = require('openai');
const { User, Overview, Work, AiInfo } = require('../../models');

require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/generate', async (req, res) => {
    try {

        const resumeData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Overview }, { model: Work }, { model: AiInfo }
            ]
        });

        const prompt = `Generate a rewritten resume overview and job experience section based on the following information:             
        Overview: ${resumeData.overviews[0].text}
        Job Experience:             
            ${resumeData.Works.map((work, index) => `\n${index + 1}) Title:${work.title}, Company:${work.company}, Responsibility ${work.responsibility}`)}
        """\nPlease rewrite the resume overview and job experience section in a way that highlights the candidate's skills and experience, and adheres to best practices for resume writing. For the job experience please provide bullet points To convey these elements, focus on adding CONTEXT and OUTCOME to each bullet point using the following formula:
        Action Verb + Situation / Task = Results (and Impact)
         `

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
            temperature: 0.2,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        // Process the AI data returned to create an object with overview and work information
        const sections = response.data.choices[0].message.content.split("\n\n");

        const aiOverview = sections[0].split(":")[1].trim();

        const aiJobExperiences = sections
            .filter((section) => !section.toLowerCase().includes("job experience"))
            .filter((section) => !section.toLowerCase().includes("overview"))
            .map((section) => {
                const [title] = section.split(", ");
                const bulletPoints = section.split("\n").slice(1).map((point) => point.replace(/^\s*[-•]\s*/, ''));
                return { title, bulletPoints };
            });


        if (resumeData.aiinfos.length) {
            const newOverview = await AiInfo.update({
                overview: aiOverview,
                responsibility: JSON.stringify(aiJobExperiences),
                user_id: req.session.user_id
            },
                {
                    where: {
                        user_id: req.session.user_id,
                    },
                })
        }
        else {
            const newOverview = await AiInfo.create({
                overview: aiOverview,
                responsibility: JSON.stringify(aiJobExperiences),
                user_id: req.session.user_id
            })
        }
        res.status(200).json({ message: "Hello?" })
    }
    catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
