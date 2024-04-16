import * as dotenv from "dotenv";
import express from "express";
import OpenAI from "openai"; // Updated import for v4

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}); // Updated way to create the client

try {
  router.route("/").get((req, res) => {
    res.send("Dall-E Activated");
  });
} catch (error) {
  console.error("Error initializing OpenAI API:", error);
}

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body

        const aiResponse = await openai.images.generate({
          model: 'dall-e-3',
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            // reponse_format: 'b64_json'
        })

        const image = aiResponse.data[0].url

        res.status(200).json({ photo: image })
    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message)
    }
})

export default router;