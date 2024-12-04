
import { FastifyInstance } from "fastify"
import { createGoal } from "./create"
import { updateGoal } from "./update"
import { deleteGoal } from "./delete"
import { fetchGoal } from "./fetchGoal"
import { fetchGoalMetrics } from "./fetchGoalMetrics"
import { fetchGoalReport } from "./fetchGoalReport"

export async function goalRoutes(app: FastifyInstance) {
    app.post('/goals', createGoal)
    app.patch('/goals/:id', updateGoal)
    app.delete('/goals/:id', deleteGoal)
    app.get('/goals/:id?', fetchGoal)
    app.get('/goals/metrics', fetchGoalMetrics)
    app.get('/goals/reports', fetchGoalReport)
}
