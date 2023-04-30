const router = require('express').Router();
const { Configuration, OpenAIApi } = require('openai');
const { User, Overview, Work, AiWork, AiOverview } = require('../../models');

require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

router.get('/overview', async (req, res) => {
    try {
        const resumeData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Overview }, { model: AiOverview }, { model: Work }, { model: AiWork }
            ]
        });

        const response = await openai.createCompletion({
            model: "text-ada-001",
            prompt: `
            Overview: ${resumeData.overviews[0].text}
            """
            Rewrite this resume summary from the current overview by using best practices for writing a resume professional summary`,
            temperature: 0,
            max_tokens: 1000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        console.log(response.data)
        console.log(resumeData)

        if (resumeData.aioverviews.length) {
            const newOverview = await AiOverview.update({
                text: response.data.choices[0].text,
                user_id: req.session.user_id
            },
                {
                    where: {
                        user_id: req.session.user_id,
                    },
                })
        }
        else {
            const newOverview = await AiOverview.create({
                text: response.data.choices[0].text,
                user_id: req.session.user_id
            })
        }
        res.status(200).json({ message: "Resume overview updated with AI!" })
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/experience', async (req, res) => {
    try {

        const resumeData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Person }, { model: Overview }, { model: Certification }, { model: Education }, { model: Skill }, { model: Work }, { model: Project }
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
    catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
