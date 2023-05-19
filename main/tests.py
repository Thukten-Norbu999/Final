import openai

api_key = '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'

openai.api_key = api_key

prompt = input()

response = openai.Completion.create(
    engine = 'text-davinci-003',
    prompt = prompt,
    max_tokens=256,
    temperature=0.5
)
print(response)
# Create your tests here.
openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}
    ]
)