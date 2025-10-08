// api/chat-assistente.js
const { GoogleGenAI } = require('@google/genai');

// ------------------------------------------------------------------
// 1. Defina o texto do Regulamento (COLE O SEU TEXTO AQUI)
// A IA utilizará este texto como a sua única fonte de conhecimento.
// Use aspas graves (`) para permitir múltiplas linhas.
// ------------------------------------------------------------------
const REGULAMENTO_TEXTO = `
    O Love Tiles Douro Granfondo 2026 realizar-se-á no dia 20 de Outubro de 2026. 
    As inscrições custam 60€.
    O percurso tem 120km e 2.500m de acumulado.
    Os kits de participante devem ser levantados no dia anterior ao evento.
    O percurso de Granfondo (longo) tem 120km e o percurso de Mediofondo (curto) tem 80km.
    Em caso de cancelamento, a organização não garante o reembolso.
    `; 
// ------------------------------------------------------------------


// A Vercel lê a variável de ambiente GEMINI_API_KEY que configuraste
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

// 3. O formato CommonJS é o mais estável para a Vercel
module.exports = async function (req, res) {
    
    // Certificar-se de que é um método POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido. Use POST.' });
    }

    try {
        // A prompt do usuário vem do frontend no corpo do pedido
        const { prompt } = req.body;
        
        // 4. Concatena a instrução do sistema e a pergunta do utilizador
        const fullContent = SYSTEM_INSTRUCTION + "\n\nPergunta do Utilizador: " + prompt;

        // 5. Chamar a API do Gemini
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Modelo rápido
            contents: fullContent, // Envia o texto completo
            config: {
                temperature: 0.1,
            },
        });

        // 6. Devolver a resposta da IA para o Frontend
        res.status(200).json({ response: result.text });

    } catch (error) {
        console.error("Erro interno no assistente de IA:", error.message);
        // Retornar um erro de servidor (500) para o frontend
        res.status(500).json({ error: "Erro interno no servidor. Verifique a chave API ou os logs da Vercel." });
    }
}