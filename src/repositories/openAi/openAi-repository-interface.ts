export interface OpenAiRepositoryInterface {
    getGoalReport(goal: any): Promise<string | null>
}