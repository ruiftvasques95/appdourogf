// api/chat-assistente.js

// Usamos 'import' (ES Module) para que funcione com o "type": "module" no package.json
import { GoogleGenAI } from '@google/genai';

// ------------------------------------------------------------------
// 1. Defina o texto do Regulamento (COLE O SEU TEXTO AQUI)
// ------------------------------------------------------------------
const REGULAMENTO_TEXTO = `
    O Love Tiles Douro Granfondo 2026 realizar-se-á no dia 20 de Outubro de 2026. 
    As inscrições custam 60€.
    O percurso de Granfondo (longo) tem 120km.
    `; 
// ------------------------------------------------------------------


// A Vercel lê a variável de ambiente GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY; 
const ai = new GoogleGenAI({ apiKey });

// 2. Crie a Instrução do Sistema injetando o texto real do regulamento
const SYSTEM_INSTRUCTION = `
    Você é um assistente especialista no regulamento do Love Tiles Douro Granfondo 2026.
    Sua tarefa é responder à pergunta do usuário de forma concisa e precisa, baseando-se
    SOMENTE no CONTEÚDO fornecido abaixo.
    Se a resposta não estiver no CONTEÚDO, responda de forma educada que não tem essa informação no regulamento.

    CONTEÚDO DO REGULAMENTO:
    ---
    ${REGULAMENTO_TEXTO} 
    ---
`;

// 3. O formato 'export default' é o formato correto para a Vercel com ES Modules
export default async function (req, res) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido. Use POST.' });
    }

    try {
        const { prompt } = req.body;
        
        // Concatena a instrução do sistema e a pergunta do utilizador
        const fullContent = SYSTEM_INSTRUCTION + "\n\nPergunta do Utilizador: " + prompt;

        // Chamar a API do Gemini
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: fullContent,
            config: {
                temperature: 0.1,
            },
        });

        // Devolver a resposta da IA para o Frontend
        res.status(200).json({ response: result.text });

    } catch (error) {
        console.error("Erro interno no assistente de IA:", error.message);
        // Em caso de falha (p. ex., chave API inválida), devolve erro 500
        res.status(500).json({ error: "Erro interno no servidor. Verifique a chave API ou os logs da Vercel." });
    }
}