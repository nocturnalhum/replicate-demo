import Replicate from 'replicate';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export default async function handler(req, res) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('The REPLICATE_API_TOKEN environment variable is not set.');
  }

  const prediction = await replicate.predictions.create({
    version: '435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117',
    input: {
      image:
        'https://sketch-canvas-images.s3.ca-central-1.amazonaws.com/Archive/canvas-2203a00d-1ac7-4a9f-af37-c919600b3910.png',
      prompt: req.body.prompt,
    },
  });

  if (prediction?.error) {
    replicate.statusCode = 500;
    res.end(JSON.stringify({ detail: prediction.error }));
    return;
  }

  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
