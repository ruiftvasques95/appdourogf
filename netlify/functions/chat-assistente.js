// netlify/functions/chat-assistente.js

// Importa o SDK do Google Gemini
import { GoogleGenAI } from '@google/genai';

// Inicializa a IA. A chave é lida automaticamente da variável de ambiente no Netlify.
// Certifique-se de definir a variável GEMINI_API_KEY no painel do Netlify.
const ai = new GoogleGenAI({}); 

// O modelo que usaremos, ideal para raciocínio e velocidade
const MODEL_NAME = "gemini-2.5-flash"; 

/**
 * Função handler que o Netlify executa quando o frontend faz um POST para este endpoint.
 * O nome da função (chat-assistente) define a URL do endpoint: /.netlify/functions/chat-assistente
 */
exports.handler = async (event, context) => {
    // 1. Verificar o método HTTP
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Método não permitido. Use POST.' })
        };
    }

    // 2. Analisar o corpo da requisição
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Corpo da requisição inválido (JSON esperado).' })
        };
    }

    const { userQuery, context: documentContext } = body;

    if (!userQuery || !documentContext) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Parâmetros "userQuery" ou "context" em falta.' })
        };
    }

    // 3. Criar a Prompt de Engenharia (Instrução para a IA)
    const prompt = `
        Você é um assistente especialista no regulamento do Love Tiles Douro Granfondo 2026.
        A sua tarefa é responder à PERGUNTA do usuário de forma concisa e precisa, 
        baseando-se SOMENTE no CONTEXTO fornecido abaixo.

        Se a resposta não estiver explicitamente no CONTEXTO, responda de forma educada 
        dizendo que a informação não consta no regulamento.

        --- CONTEXTO DO REGULAMENTO ---
        ${documentContext}
        --- FIM DO CONTEXTO ---

        PERGUNTA DO USUÁRIO: ${userQuery}
        RESPOSTA:
    `;

    try {
        // 4. Chamar a API do Gemini
        const result = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                temperature: 0.1, // Manter o modelo focado e factual
            }
        });

        // 5. Devolver a resposta da IA para o frontend
        const aiResponse = result.text.trim();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ aiResponse: aiResponse })
        };

    } catch (error) {
        console.error("Erro ao chamar a API do Gemini:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Falha interna ao processar a IA. Verifique as chaves e permissões.', details: error.message })
        };
    }
};