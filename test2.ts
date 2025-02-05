import OpenAI from "openai"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  
})

async function main() {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1-distill-llama-70b:free",
    messages: [
      {
        "role": "user",
        "content": "Who are you bitch"
      }
    ]
  })

  console.log(completion.choices[0].message)
}
main()