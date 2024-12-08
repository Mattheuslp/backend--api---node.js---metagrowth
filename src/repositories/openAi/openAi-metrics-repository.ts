import { openAi } from "../../lib/openAi";
import { OpenAiRepositoryInterface } from "./openAi-repository-interface";

export class OpenAiMetricsRepository implements OpenAiRepositoryInterface {
  async getGoalReport(goals: any) {
    const content = `Gere um relatório com insights sobre as metas da minha equipe, com orientações de como melhorar o desempenho geral. As metas estão listadas abaixo separadas por ponto e vírgula. A estrutura de cada meta é {ID};{TÍTULO};{DATA DE INÍCIO};{DATA DE TÉRMINO};{DESCRIÇÃO};{STATUS DE CONCLUSÃO};{NOME DO COLABORADOR}. Seguem as metas:
        ${goals
        .map(
          (goal: any) =>
            `${goal.id};${goal.title};${new Date(goal.startDate).toLocaleDateString("pt-BR")};${new Date(
              goal.endDate
            ).toLocaleDateString("pt-BR")};${goal.description};${goal.isCompleted ? "Concluída" : "Não Concluída"};${goal.user.name
            }`
        )
        .join(";")}
Retorne o resultado com as seguintes seções separadas por uma palavra-chave e duas barras "//":
1. "INSIGHTS" - um texto com os principais insights sobre o desempenho da equipe baseado nas metas fornecidas.
2. "DICAS" - orientações práticas de como melhorar o desempenho das metas da equipe.
3. "ESTATÍSTICAS" - números agregados como total de metas, metas concluídas, metas pendentes.

**Formato esperado do retorno**:
INSIGHTS://Texto com insights;
DICAS://Texto com orientações;
ESTATÍSTICAS://TotalMetas:{número};MetasConcluídas:{número};MetasPendentes:{número};.
Certifique-se de retornar exatamente nesse formato. Não use HTML, código ou estruturas fora desse padrão.
`;

    const completion = await openAi.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em gestão de equipes e metas de desempenho. Você ajuda gestores a analisar e compreender as metas de sua equipe, fornecendo insights e sugestões para melhorar o desempenho.",
        },
        {
          role: "user",
          content,
        },
      ],
    });

    return completion.choices[0].message.content;
  }
}
