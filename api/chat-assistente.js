// api/chat-assistente.js
// Usamos 'import' (ES Module) em conjunto com "type": "module" no package.json

import { GoogleGenAI } from '@google/genai';

// ------------------------------------------------------------------
// 1. Defina o texto do Regulamento (COLE O SEU TEXTO AQUI)
// ------------------------------------------------------------------
const REGULAMENTO_TEXTO = `
 Regulamento | Love Tiles Douro Granfondo 2026

Art. 1 O Love Tiles Douro Granfondo 2026 é uma Prova Aberta, com caráter competitivo amador, organizada pela Bikeservice, e disputada em conformidade com os Regulamentos da Federação Portuguesa de Ciclismo e o presente regulamento, respeitando a regulamentação respetiva, bem como as regras do Código da Estrada. 
A participação é limitada a veículos de duas rodas (bicicleta de estrada, de montanha ou tandem), não sendo admitidos veículos motorizados ou e-bikes.
Art. 2 – Data/Distâncias 
A 11ª edição do LOVE TILES DOURO GRANFONDO terá início às 9h de domingo 10 de maio de 2026, no Peso da Régua, acabando na mesma localidade.

A abertura das BOXES inicia-se às 8h; o controlo de meta encerra às 16h.
A partida tem cerca de 1km controlado até iniciar o andamento livre.

Art. 3 – O LOVE TILES DOURO GRANFONDO terá uma distância de 141km na versão Granfondo. Haverá também duas distâncias mais curtas, uma denominada Mediofondo, com a extensão de 104km, e o Minifondo, com 82km.
Em qualquer uma delas é obrigatório o uso de capacete devidamente homologado.

Art. 4 – Participação/Inscrição
A prova terá um limite de 2000 participantes no somatório das três distâncias, que deverão efetuar a inscrição através do site do LOVE TILES DOURO GRANFONDO (www.bikeservice.pt) ou na sede da Bikeservice, Póvoa de Varzim.

Art. 5 – O pagamento da inscrição pode ser feito por ref. MB (prazo de validade das Ref. MB de 72horas).
Depois de efetuado o pagamento, em caso de desistência até ao dia 10 de Abril de 2026 o participante pode reaver 50% do valor da inscrição.
Após essa data a inscrição é considerada definitiva.

Art. 6 - Após o dia 27 de abril são permitas trocas de titularidade da inscrição ou alteração para outro Granfondo organizado pela Bikeservice mediante o pagamento das taxas administrativas no valor de 5€. 

Art. 6.1 – A taxa administrativa aplicada não inclui nova personalização do dorsal em caso de troca de titularidade após o dia 27 de Abril.

Art. 7 – A participação só é permitida a indivíduos maiores de 15 anos, sendo da inteira responsabilidade e risco dos participantes.
Estes, no momento da inscrição, devem encontrar-se fisicamente e clinicamente aptos para a prova.
Para os participantes com idades compreendidas entre 15 e 16 anos (cadetes) é obrigatório a realização do percurso mais curto.
Os atletas do escalão júnior (17 e 18 anos), estão excluídos de participar na distância mais longa.
Para a maior distância terão no mínimo de completar 19 anos até final do ano de 2026.

 Art. 8 – Custo da inscrição:
Minifondo, Mediofondo e Granfondo até as 18h00 de 9 de maio de 2026:
46€ - Atletas Federados na Federação Portuguesa de Ciclismo
50€ - Atletas NÃO Federados na Federação Portuguesa de Ciclismo

Todos os participantes estrangeiros são considerados NÃO FEDERADOS. 
Todos os participantes que não possuam licença federativa para o ano em curso, emitida por Federação Portuguesa de Ciclismo, devem subscrever obrigatoriamente a inscrição com seguro (para atletas não federados), na qual está incluído um seguro de acidentes pessoais responsabilidade civil para o dia do evento.

O custo da inscrição, até dia de 8 de maio de 2026, será de 46 euros exclusivamente para federados na UVP-FPC. 
É OBRIGATÓRIO inscrever o número da licença federativa no ato da inscrição.
Em caso de acidente o participante tem que acionar o seguro da federação.

Para não federados o custo é de 50 euros.

Os únicos seguros válidos para participar na prova são os seguros de acidentes pessoais e de responsabilidade civil, fornecidos com a licença federativa de ciclismo emitida pela Federação Portuguesa de Ciclismo ou o seguro contratado pela organização para o efeito (não são válidos seguros pessoais, seguro da Federação Portuguesa de Cicloturismo, seguro da Federação Portuguesa de Triatlo, ou qualquer outra Federação Desportiva).

Para todas as inscrições realizadas após o dia 27 de Abril de 2026, o dorsal não será personalizado com o nome do participante.

A inscrição só será considerada válida após o pagamento da mesma, dentro do prazo estabelecido e através dos meios de pagamento divulgados quando finaliza a inscrição.
A fatura referente à inscrição na prova será emitida de acordo com a informação recolhida no formulário de inscrição.

As inscrições encerram quando atingidas as 2000 ou dia 8 de Maio de 2026 às 18h00.

Art. 9 – Chamamos a atenção para a obrigatoriedade de a licença ser válida no momento da realização da prova. Aqueles que se inscreveram no ano anterior ao da realização da prova com uma licença válida para essa época e não a renovaram no ano em questão não estarão abrangidos pelo valor da inscrição para federados.

Art. 10 – É obrigatório a colocação do frontal no guiador da bicicleta, caso o participante coloque em qualquer outra zona que não a indicada, não será permitida a entrada na box da partida.

Art. 11 - Kit de participante 
A inscrição inclui:
- Direito a participar no Love Tiles Douro Granfondo 2026
- Almoço volante
- Ofertas a definir 
- Medalha de finisher
- 2/3 fotos de cada aleta disponibilizadas no facebook oficial do evento “Douro Granfondo”
- Abastecimentos líquidos e sólidos
- Diploma de finisher através de suporte digital
- Frontal personalizado com nome e nacionalidade (para inscrições validadas até dia 27 de Abril)
- Primeiros socorros e assistência médica
- Acesso aos balneários para banho
- Classificação através de chip eletrónico
- Assistência mecânica profissional
- Seguro de acidentes pessoais de acordo com a lei em vigor (atletas não federados na FPC – Franquia no valor de 90€)
Coberturas capitais por pessoa:
Morte por Acidente 27.665,18Euros
Invalidez Permanente por Acidente 27.665,18Euros
Despesas de Tratamento por acidente 4.425,92Euros
Mortes simultânea da Pessoa Segura e Cônjuge 15.000,00Euros
Despesas de Funeral (Gastos) 5.000,00Euros
Despesas c/operações salvamento, busca, transp. sinistrado 1.000,00Euros
Franquias p/ pessoa 90,00Euros (suportada pelo atleta segurado)
O seguro do dia é subscrito na Federação Portuguesa de Ciclismo, sendo o mesmo em regime de contrarreembolso.

Haverá um equipamento oficial do LOVE TILES DOURO GRANFONDO, composto por camisola, calção e luvas, que estará disponível na loja online e no secretariado da prova.
Loja online: https://pacto.cc/product-category/edicoes-especiais/granfondos/


Art. 12 – Cronometragem 
Embora tratando-se de um passeio cicloturístico, cada participante terá o seu tempo cronometrado através de um sistema de chip eletrónico intransmissível e de uso obrigatório, sob pena de desclassificação.
Todos os participantes deverão passar sob o pórtico de partida, sob pena de o chip não ser ativado e o seu tempo não ser cronometrado. A leitura do chip apenas ocorrerá se este for colocado conforme as instruções. É obrigatória a colocação do frontal com o chip no guiador da bicicleta. A organização não se responsabiliza pela falha da apresentação de resultados resultante da má colocação do chip. Irá ser apresentado nos resultados o tempo de Chip, tempo entre a passagem pelo pórtico de partida e pórtico de chegada, sendo este tempo meramente indicativo.
O tempo contabilizado para a classificação começa a contar assim que é dada a partida do evento, para todos os participantes ao mesmo tempo.

Art. 13- Ordem de partida 
A partida para o Granfondo, Mediofondo e Minifondo será dada em simultâneo, com os participantes a serem distribuídos por Boxes de partida denominadas da seguinte forma:
Convidados + Inscrição VIP - Box LOVE TILES
1 ao 100 - Box LOVE TILES
101 ao 400 - Box MARGRES
401 ao 600 - Box KTM BIKE INDUSTRIES
601 ao 800 - Box CADÃO DOURO
801 ao 1000 - Box LACOVIANA
1001 ao 1200- Box Triauto/VOLVO
1201 ao 1400 - Box CACB
1401 ao 1600 – Box Casa Peixoto 
1601 ao 1800 - Box Reconco
1801 ao 2000 – Box Pacto 

Esta distribuição será feita exclusivamente por ORDEM DE PAGAMENTO. Cada uma destas boxes terá 300 lugares, sendo importante notar que haverá uma zona reservada para convidados à frente destas boxes.

Art. 14 – Prémios 
Trofeu para o Vencedor absoluto Masculino e o feminino Minifondo/Mediofondo/Granfondo 
No Mediofondo e Granfondo - Três primeiros dos seguintes escalões:
Masculinos
- Elites (nascidos até 1997)
- Masters A (de 1987 a 1996)
- Masters B (de 1977 a 1986)
- Masters C (de 1967 a 1976)
- Masters D (de 1957 a 1966)
- Masters E (nascidos em 1956 ou antes)

Femininos
- Elites (nascidos até 1997)
- Masters A (de 1987 a 1996)
- Masters B (de 1977 a 1986)
- Masters C (nascidas em 1976 ou antes)

Minifondo 
Trofeus para os 3 primeiros da geral Masculinos e Femininos 

Equipas:
- Três primeiras equipas do Granfondo, contam os 3 melhores classificados, sem distinção de categoria.

- Equipa mais numerosa.

A cerimónia do pódio às 14H30


Art. 15 – Secretariado 
No dia 9 de maio entre as 10h e as 19h30
No dia 10 de maio das 7h às 8h30

Fica situado na Av. do Douro parque de estacionamento do Douro Rio Café junto ao local de Partida.
Documentos obrigatórios para levantamento:

- Titular da inscrição: 
- Cartão de Cidadão; 
- Em caso de ser federado é obrigatório apresentar a licença desportiva (ou fotocópia)

Levantamento por outra pessoa:
- Nº do cartão de cidadão e data de nascimento do titular da inscrição; 
- Em caso de o titular ser federado é obrigatório apresentar licença desportiva (ou fotocopia).

Art. 16 – Assistência médica 
O LOVE TILES DOURO GRANFONDO terá um acompanhamento médico disponibilizado pela organização e que será acionado sempre e quando algum participante o solicite junto de um elemento do staff organizativo ou através do numero de emergência médica disponível no frontal.

Art. 17 - Assistência mecânica 
O evento terá assistência mecânica no local de partida e ao longo do percurso, efetuada por veículos e elementos da organização.
É interdito o fornecimento de assistência mecânica durante a prova por carros de apoio particulares ou das equipas dos participantes. É expressamente proibida a circulação de viaturas das equipas e particulares durante o percurso.

Art. 17.1 – Aconselha-se os participantes a transportarem consigo material e ferramentas básicos, como câmaras-de-ar suplentes, desmontas e bomba para fazer face a problemas simples como furos. Embora possam contar com a ajuda de elementos da organização, estes podem encontrar-se longe do local da avaria, o que atrasará o participante mais do que o estritamente necessário.
Em caso de avaria, a organização oferece a mão-de-obra mas caso seja necessário proceder à substituição de alguma peça esta será cobrada ao participante.

Art. 18 – Disposições legais 
A todos os participantes é exigido o respeito pelas leis do Código da Estrada, uma vez que o LOVE TILES DOURO GRANFONDO percorre estradas abertas ao trânsito. Quem não cumprir a lei será expulso desta e de futuras edições deste passeio.

Art. 19 – A organização não poderá ser responsabilizada por qualquer acidente que o participante possa causar ou ser vítima, nem de eventuais dívidas contraídas pelos participantes antes, depois ou no decurso do passeio, nem de avarias ou extravios que possam sofrer bicicletas e/ou outros equipamentos dos participantes. Ao inscrever-se, o participante está implicitamente a isentar a organização de responsabilidade por perda ou deterioração de objetos pessoais sob qualquer circunstância.

Art. 20 – A organização reserva-se o direito de efetuar as modificações que considerar oportunas, no percurso ou outras, sempre e quando estas se justificarem. De igual modo reserva-se o direito de admissão no LOVE TILES DOURO GRANFONDO.

Art. 21 - Direitos de imagem 
A aceitação deste regulamento significa que o participante autoriza a organização do LOVE TILES DOURO GRANFONDO a gravar, total ou parcialmente, a sua participação na mesma; autoriza a utilização da sua imagem na promoção e divulgação da imagem do LOVE TILES DOURO GRANFONDO sob todas as suas formas (TV, rádio, imprensa, fotos, DVD, internet, cartazes, flyers, etc) e cede todos os direitos relativos à exploração comercial e publicitária da mesma sem reclamar qualquer contrapartida económica. A organização garante aos participantes o total respeito pela lei de proteção de dados.

Art. 22 – O mero ato de inscrição neste evento supõe a aceitação total deste regulamento, ao mesmo tempo que se renuncia a toda e qualquer ação legal contra a organização que pudesse derivar da participação no LOVE TILES DOURO GRANFONDO.

Art. 23 – Penalizações 
Serão penalizados, em último caso com a desclassificação, todos aqueles que:
a) Desrespeitem o Código da Estrada.
b) Não respeitem as indicações fornecidas por elementos da organização e/ou forças da ordem.
c) Não passem pelo controlo zero na partida e outros pontos de passagem obrigatórios ao longo do percurso.
d) Não respeitem o ambiente, poluindo ou degradando o mesmo ao longo do percurso, seja pelo lançamento de desperdícios ou outros.
e) Disponham de carro de apoio próprio que, à revelia da organização, possa de alguma forma prejudicar o normal desenrolar do passeio.
f) Se comportem de forma desrespeitosa para o presente regulamento e/ou para o normal desenrolar da prova.

Art. 24 – Disposições finais 
Recomenda-se vivamente a todos os participantes a realização de um exame médico completo antes de participar neste passeio. Do mesmo modo se chama a atenção para a necessidade de uma alimentação/hidratação adequada, não obstante a organização disponibilizar reforço de líquidos e sólidos em pontos determinados do percurso.

Art. 25 - A organização não assumirá qualquer responsabilidade, nomeadamente indemnizar os participantes, ou devolver o valor da inscrição, caso o passeio (prova aberta) seja adiado ou cancelado por motivos de força maior se as condições climatéricas, ambientais ou de segurança se verifiquem extremas (ex.: incêndio florestal, tempestades, derrocadas, quedas de árvores, ciclones, conflito armado, epidemias, pandemias, etc.), caso se verifiquem estas condições a prova é cancelada ou reagendada por decisão da organização.

Art. 26 – Cabe à organização analisar e decidir sobre eventuais casos omissos e/ou excecionais.

Art. 27 - Não será aceite a inscrição/participação de indivíduos a cumprir castigo da respetiva federação nacional por uso de substâncias dopantes.

Art. 28 - Ao inscrever-me no Love Tiles Douro Granfondo 2026, autorizo que a Stopandgo e a Bikeservice comunique comigo via sms e email com os seguintes fins:
• informação dos dados de pagamento
• informação dos dados de participante
• informação classificativa
• informação sobre a prova
 
    `; 
// ------------------------------------------------------------------


// A Vercel lê a variável de ambiente GEMINI_API_KEY
const apiKey = process.env.Douro2026;
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

// 3. O formato 'export default' é o formato correto para Vercel com ES Modules
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
        res.status(500).json({ error: "Erro interno no servidor. Verifique a chave API ou os logs da Vercel." });
    }
}