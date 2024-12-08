import { GoalRepositoryInterface } from "../../repositories/goal-repository-interface";
import { OpenAiRepositoryInterface } from "../../repositories/openAi/openAi-repository-interface";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";

export interface FetchGoalReportRequest {
    userId: string;
}

export interface FetchGoalReportResponse {
    insights: string;
    dicas: string;
    estatisticas: {
        totalMetas: number;
        metasConcluidas: number;
        metasPendentes: number;
    };
}

export class FetchGoalReportService {
    private userRepository: UsersRepositoryInterface;
    private goalRepository: GoalRepositoryInterface;
    private openAiRepository: OpenAiRepositoryInterface;

    constructor(
        userRepository: UsersRepositoryInterface,
        goalRepository: GoalRepositoryInterface,
        openAiRepository: OpenAiRepositoryInterface
    ) {
        this.userRepository = userRepository;
        this.goalRepository = goalRepository;
        this.openAiRepository = openAiRepository;
    }

    async execute({ userId }: FetchGoalReportRequest): Promise<FetchGoalReportResponse> {
        console.log("Buscando usuário:", userId);

        const user: any = await this.userRepository.findById(userId);

        if (user.role !== "MANAGER") {
            console.error("Usuário não é um gerente:", user);
            throw new Error("Usuário não tem permissão para gerar relatórios");
        }

        console.log("Buscando metas do time gerenciado:", user.id);
        const goals = await this.goalRepository.fetchByTeamManager(user.id);
        console.log("Metas obtidas:", goals);

        const rawReport = await this.openAiRepository.getGoalReport(goals);
        console.log("Relatório bruto retornado pela OpenAI:", rawReport);

        if (!rawReport) {
            throw new Error("O relatório retornado pela OpenAI está vazio.");
        }

        return this.parseReport(rawReport, goals);
    }

    private parseReport(rawReport: string, goals: any[]): FetchGoalReportResponse {
        try {
            console.log("Processando relatório bruto:", rawReport);
    
            const lines = rawReport.split(/[\n;]/);
            const insights = lines
                .find((line) => line.startsWith("INSIGHTS://"))
                ?.replace("INSIGHTS://", "")
                .trim() || "";
    
            const dicas = lines
                .find((line) => line.startsWith("DICAS://"))
                ?.replace("DICAS://", "")
                .trim() || "";
    
            // Estatísticas calculadas localmente
            const totalMetas = goals.length;
            const metasConcluidas = goals.filter((goal) => goal.isCompleted).length;
            const metasPendentes = totalMetas - metasConcluidas;
    
            return {
                insights,
                dicas,
                estatisticas: {
                    totalMetas,
                    metasConcluidas,
                    metasPendentes,
                },
            };
        } catch (error) {
            console.error("Erro ao processar o relatório:", error);
            throw new Error("Erro ao processar o relatório retornado pela OpenAI.");
        }
    }
    
    
}
