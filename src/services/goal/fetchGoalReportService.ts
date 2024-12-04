import { GoalRepositoryInterface } from "../../repositories/goal-repository-interface";
import { OpenAiRepositoryInterface } from "../../repositories/openAi/openAi-repository-interface";
import { UsersRepositoryInterface } from "../../repositories/users-repository-interface";

export interface FetchGoalReportRequest {
    userId: string;
}

export interface FetchGoalReportReponse {
    report: string
}

export class FetchGoalReportService {
    private userRepository: UsersRepositoryInterface;
    private goalRepository: GoalRepositoryInterface;
    private openAiRepository: OpenAiRepositoryInterface;

    constructor(userRepository: UsersRepositoryInterface, goalRepository: GoalRepositoryInterface, openAiRepository: OpenAiRepositoryInterface) {
        this.userRepository = userRepository;
        this.goalRepository = goalRepository;
        this.openAiRepository = openAiRepository;
    }

    async execute({ userId }: FetchGoalReportRequest) {
        
        const user: any = await this.userRepository.findById(userId)
 
        if(user.role !== "MANAGER") {
        
            throw new Error("Usuário não tem permissão para gerar relatórios");
        }
        
        const goal = await this.goalRepository.fetchByTeamManager(user.id)

       
        const report = await this.openAiRepository.getGoalReport(goal)

       return report
    }
}
