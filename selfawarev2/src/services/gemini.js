const GEMINI_API_KEY = 'Sua chave aqui';

export async function getGeminiFeedback(respostas, contexto = "Relacionamentos Amorosos") {
  const prompt = `
Você é um assistente empático especializado em saúde emocional.
O usuário respondeu a um teste de dependência emocional no contexto: ${contexto}.
As respostas (de 1 a 5) para as afirmações são: [${respostas.join(', ')}].

Com base nessas respostas, faça:
- Uma análise breve e acolhedora sobre o nível de dependência emocional.
- Um feedback personalizado, sem julgamentos, explicando o resultado.
- Sugestões de desenvolvimento pessoal para promover autonomia emocional.

Fale de forma humana, acolhedora e motivacional.
`;

  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Não foi possível gerar um feedback no momento.';
}
