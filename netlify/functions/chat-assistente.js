// netlify/functions/chat-assistente.js

// 1. IMPORTAÇÃO: Usamos a sintaxe de módulo 'import' (ES Modules)
import { GoogleGenAI } from '@google/genai';

// Inicializa a IA. O SDK lê a variável GEMINI_API_KEY automaticamente do Netlify.
const ai = new GoogleGenAI({}); 

// O modelo que usaremos.
const MODEL_NAME = "gemini-2.5-flash"; 

/**
 * Função handler principal que o Netlify executa para responder ao POST.
 * O nome da função (chat-assistente) define a URL do endpoint: /.netlify/functions/chat-assistente
 */
// 2. EXPORTAÇÃO: Usamos o formato 'exports.handler' para compatibilidade total com o Netlify
exports.handler = async (event, context) => {
    // 3. Verifica se o método é POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Método não permitido. Use POST.' })
        };
    }

    // 4. ANÁLISE DO BODY: A correção final que resolve a falha assíncrona
    // Assumimos que o frontend envia JSON válido.
    try {
        const { userQuery, context: documentContext } = JSON.parse(event.body);

        if (!userQuery || !documentContext) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Parâmetros "userQuery" ou "context" em falta.' })
            };
        }

        // 5. Cria a Prompt de Engenharia
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

        // 6. Chamar a API do Gemini (Usa 'await' devido ao 'async' na linha 20)
        const result = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                temperature: 0.1, // Manter o modelo focado e factual
            }
        });

        // 7. Devolver a resposta da IA para o frontend
        const aiResponse = result.text.trim();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ aiResponse: aiResponse })
        };

    } catch (error) {
        // 8. Tratamento de Erro (Log e Resposta ao Frontend)
        console.error("Erro ao processar requisição:", error);
        
        // Retornamos um erro 500 para o frontend
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Falha interna ao processar a IA. Por favor, tente novamente.', details: error.message })
        };
    }
};