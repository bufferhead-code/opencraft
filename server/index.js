import Fastify from 'fastify'
import { fileURLToPath } from "url";
import path from "path";
import { LlamaChatSession, LlamaContext, LlamaJsonSchemaGrammar, LlamaModel } from "node-llama-cpp";
import cors from '@fastify/cors'

const __filename = fileURLToPath(import.meta.url)

const fastify = Fastify({
    logger: true,
    requestTimeout: 60 * 1000
})
await fastify.register(cors, {
    // put your options here
})

async function craftNewWord(firstWord, secondWord) {
    console.log(firstWord, secondWord);
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const model = new LlamaModel({
        modelPath: path.join(__dirname, "models", "mistral-7b-instruct-v0.1.Q8_0.gguf"),
    });
    const context = new LlamaContext({model, seed: 0});
    const session = new LlamaChatSession({context});

    const grammar = new LlamaJsonSchemaGrammar({
        "type": "object",
        "properties": {
            "answer": {
                "type": "string"
            },
        }
    });

    const systemPrompt =
        'You are a helpful assistant that helps people to craft new things by combining two words into a new word. ' +
        'The most important rules that you have to follow with every single answer that you are not allowed to use the words ' + firstWord + " and " + secondWord + ' as part of your answer and that you are only allowed to answer with one thing. ' +
        'DO NOT INCLUDE THE WORDS ' + firstWord + " and " + secondWord + ' as part of the answer!!!!! The words ' + firstWord + " and " + secondWord + ' may NOT be part of the answer. ' +
        'No sentences, no phrases, no multiple words, no punctuation, no special characters, no numbers, no emojis, no URLs, no code, no commands, no programming' +
        'The answer has to be a noun. ' +
        'The order of the both words does not matter, both are equally important. ' +
        'The answer has to be related to both words and the context of the words. ' +
        'The answer can either be a combination of the words or the role of one word in relation to the other. ' +
        'Answers can be things, materials, people, companies, animals, occupations, food, places, objects, emotions, events, concepts, natural phenomena, body parts, vehicles, sports, clothing, furniture, technology, buildings, technology, instruments, beverages, plants, academic subjects and everything else you can think of that is a noun.'

    const emojiSystemPrompt = 'Reply with one emoji the word. Use the UTF-8 encoding.';
    const answerPrompt = 'Reply with the result of what would happen if you combine ' + firstWord + " and " + secondWord + '. The answer has to be related to both words and the context of the words and may not contain the words themselves. '

    const q1 = firstWord + " and " + secondWord + " . ";

    const promp = '<s>[INST] ' +
        systemPrompt +
        answerPrompt + '[/INST]</s>\n';

    const result = await session.prompt(promp, {
        grammar,
        maxTokens: context.getContextSize()
    });


    const emojiPrompt = '<s>[INST] ' +
        emojiSystemPrompt +
        JSON.parse(result).answer + '[/INST]</s>\n';

    const emojiResult = await session.prompt(emojiPrompt, {
        grammar,
        maxTokens: context.getContextSize()
    });

    if (JSON.parse(result).answer.toLowerCase().trim().split(' ').length > 3 ||
        (JSON.parse(result).answer.toLowerCase().includes(firstWord.toLowerCase()) &&
            JSON.parse(result).answer.toLowerCase().includes(secondWord.toLowerCase()) &&
            JSON.parse(result).answer.length < (firstWord.length + secondWord.length + 2))
    ) {
        return {result: '', emoji: ''}
    }
    return {result: capitalizeFirstLetter(JSON.parse(result).answer), emoji: JSON.parse(emojiResult).answer}
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


fastify.route({
    method: 'GET',
    url: '/',
    schema: {
        // the response needs to be an object with an `hello` property of type 'string'
        response: {
            200: {
                type: 'object',
                properties: {
                    'Water + Fire': {type: 'string'},
                    'Water + Earth': {type: 'string'},
                    'Fire + Earth': {type: 'string'},
                    'Water + Air': {type: 'string'},
                    'Earth + Air': {type: 'string'},
                    'Fire + Air': {type: 'string'}
                }
            }
        },
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
        // E.g. check authentication
    },
    handler: async (request, reply) => {
        reply.type('application/json').code(200)

        return {
            'Water + Fire': (await craftNewWord('Water', 'Fire')),
            'Water + Earth': (await craftNewWord('Water', 'Earth')),
            'Fire + Earth': (await craftNewWord('Fire', 'Earth')),
            'Water + Air': (await craftNewWord('Water', 'Air')),
            'Earth + Air': (await craftNewWord('Earth', 'Air')),
            'Fire + Air': (await craftNewWord('Fire', 'Air'))
        }
    }
})

fastify.route({
    method: 'POST',
    url: '/',
    schema: {
        // the response needs to be an object with an `hello` property of type 'string'
        response: {
            200: {
                type: 'object',
                properties: {
                    result: {type: 'string'},
                    emoji: {type: 'string'}
                }
            }
        }
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
        // E.g. check authentication
    },
    handler: async (request, reply) => {

        if (!request?.body?.first || !request?.body?.second) {
            return;
        }

        const firstWord = capitalizeFirstLetter(request.body.first.trim().toLowerCase());
        const secondWord = capitalizeFirstLetter(request.body.second.trim().toLowerCase());
        reply.type('application/json').code(200)

        return await craftNewWord(firstWord, secondWord)
    }
})

try {
    await fastify.listen({port: 3000, host: '0.0.0.0'})
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}
