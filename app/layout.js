export async function POST(request) {
  const { messages, max_tokens } = await request.json()

  const res = await fetch(`${process.env.ANTHROPIC_BASE_URL}/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_AUTH_TOKEN,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: max_tokens || 1600,
      messages,
    }),
  })

  const data = await res.json()
  return Response.json(data)
}
