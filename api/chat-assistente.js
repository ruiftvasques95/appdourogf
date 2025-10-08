// api/chat-assistente.js

import { GoogleGenAI } from '@google/genai';

// A Vercel lê esta variável de ambiente que configuraste
const apiKey = process.env.GEMINI_API_KEY; 
const ai = new GoogleGenAI({ apiKey });

// 1. Criar a Promp de Engenharia Estruturada (o seu regulamento)
const SYSTEM_INSTRUCTION = `
    Você é um assistente especialista no regulamento do Love Tiles Douro Granfondo 2026.
    A sua tarefa é responder à pergunta do usuário de forma concisa e precisa,
    baseando-se SOMENTE no CONTEÚDO fornecido abaixo.
    Se a resposta não estiver explicitamente no CONTEÚDO, responda de forma educada
    que não tem essa informação no regulamento.

    CONTEÚDO DO REGULAMENTO:
    {DOCUMENTO_TEXTO}
    <O SEU REGULAMENTO DEVE ESTAR AQUI>
`;

// O formato de exportação para a Vercel (Node.js/Express) é um handler padrão
export default async function (req, res) {
    
    // Certificar-se de que é um método POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido. Use POST.' });
    }

    try {
        // A prompt do usuário vem do frontend no corpo do pedido
        const { prompt } = req.body;
        
        // 2. Chamar a API do Gemini
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Use o modelo de melhor custo-benefício e velocidade
            contents: SYSTEM_INSTRUCTION.replace('<O SEU REGULAMENTO DEVE ESTAR AQUI>', prompt), // Aqui usa-se a sua instrução
            config: {
                temperature: 0.1,
            },
        });

        // 3. Devolver a resposta da IA para o Frontend
        res.status(200).json({ response: result.text });

    } catch (error) {
        console.error("Erro interno no assistente de IA:", error.message);
        // Retornar um erro de servidor (500) para o frontend
        res.status(500).json({ error: "Erro interno no servidor. Verifique a chave API ou os logs da Vercel." });
    }
}