import { Request, Response } from 'express';
import { ResponseStatus } from '../../constants/constants';


import {
    FunctionDeclarationSchemaType,
    HarmBlockThreshold,
    HarmCategory,
    VertexAI
  } from '@google-cloud/vertexai';


// Initialize Vertex with your Cloud project and location
// const vertex_ai = new VertexAI({ project: 'learncraft-440107', location: 'us-central1' });
const model = 'gemini-1.5-flash-002';

// Instantiate the models
const project = 'learncraft-440107';
const location = 'us-central1';
const textModel =  'gemini-1.5-flash-002';
const visionModel = 'gemini-1.0-pro-vision';

const vertexAI = new VertexAI({project: project, location: location});


// Instantiate Gemini models
const generativeModel = vertexAI.getGenerativeModel({
    model: textModel,
    // The following parameters are optional
    // They can also be passed to individual content generation requests
    safetySettings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
    generationConfig: {maxOutputTokens: 256},
    systemInstruction: {
      role: 'system',
      parts: [{"text": `For example, you are a helpful customer service agent.`}]
    },
});

const generativeVisionModel = vertexAI.getGenerativeModel({
    model: visionModel,
});

const generativeModelPreview = vertexAI.preview.getGenerativeModel({
    model: textModel,
});

async function streamGenerateContent(question) {
    const request = {
      contents: [{role: 'user', parts: [{text: question}]}],
    };
    const streamingResult = await generativeModel.generateContentStream(request);
    for await (const item of streamingResult.stream) {
      console.log('stream chunk: ', JSON.stringify(item));
    }
    const aggregatedResponse = await streamingResult.response;
    console.log('aggregated response: ', JSON.stringify(aggregatedResponse));
    return aggregatedResponse
  };
  
  

export const getGeminiChat = async (req: Request, res: Response) => {
  const userQuestion = req.query.q;

  const response = await streamGenerateContent(userQuestion);
  const answerContent = response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response available';
  console.log("ANSWER: ", answerContent)
  res.status(ResponseStatus.Ok).send(answerContent);
};
