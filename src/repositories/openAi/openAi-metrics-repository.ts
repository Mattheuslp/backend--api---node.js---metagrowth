import { openAi } from "../../lib/openAi";
import { OpenAiRepositoryInterface } from "./openAi-repository-interface";

export class OpenAiMetricsRepository implements OpenAiRepositoryInterface {
  async getGoalReport(goals: any) {
    const content = `Por favor, gere um relatório que forneça insights sobre as metas da minha equipe. As metas estão listadas abaixo com os seguintes detalhes: {ID}-{TÍTULO}-{DATA DE INÍCIO}-{DATA DE TÉRMINO}-{DESCRIÇÃO}-{STATUS DE CONCLUSÃO}-{NOME DO COLABORADOR}. As metas são:
        ${goals
          .map(
            (goal: any) =>
              `${goal.id} - ${goal.title} - ${new Date(goal.startDate).toLocaleDateString(
                "pt-BR"
              )} - ${new Date(goal.endDate).toLocaleDateString("pt-BR")} - ${
                goal.description
              } - ${goal.isCompleted ? "Concluída" : "Não Concluída"} - ${goal.user.name}`
          )
          .join("; ")}, retorne o conteúdo estruturado como html para ser usado dentro de um componente react, então não pode haver text fora das tags e utilize tailwind para estilizar e deixar formato como um relatório e utilize a cor branca para os textos,Importante: retorne somente o HTML puro, sem envolver em blocos de código ou backticks. Não inclua \`\`\`html ou qualquer formatação de código. Apenas o conteúdo HTML.`;

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
