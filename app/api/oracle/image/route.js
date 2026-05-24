export async function POST(request) {
  const { prompt } = await request.json()

  const res = await fetch('https://newapi.leafory.store/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.IMAGE_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt,
      n: 1,
      size: '1024x1536',
    }),
  })

  const data = await res.json()
  return Response.json(data)
}
