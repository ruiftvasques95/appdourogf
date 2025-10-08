// netlify/functions/chat-assistente.js

import { GoogleGenAI } from '@google/genai';

// A chave é lida automaticamente do Netlify
const ai = new GoogleGenAI({}); 

// A função handler DEVE ser declarada como 'async'
export async function handler(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Método não permitido' };
    }

    try {
        const { message, context: docContext } = JSON.parse(event.body);

        // A chamada ao Gemini DEVE usar 'await'
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                { role: "user", parts: [{ text: docContext + "\nPergunta: " + message }] }
            ],
            config: {
                // Configurações do modelo
            }
        });

        // Retorno de SUCESSO com status 200
        return {
            statusCode: 200,
            body: JSON.stringify({ reply: response.text }),
        };

    } catch (error) {
        console.error('Erro na função Gemini:', error);
        
        // Retorno de ERRO com status 500
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Erro ao processar o pedido na função de assistente.' 
            }),
        };
    }
}