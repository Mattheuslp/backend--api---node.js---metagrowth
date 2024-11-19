
import { FastifyInstance } from "fastify"
import { createGoal } from "./create"
import { updateGoal } from "./update"
import { deleteGoal } from "./delete"

export async function goalRoutes(app: FastifyInstance) {
    app.post('/goals/:userId', createGoal)
    app.patch('/goals/:id', updateGoal)
    app.delete('/goals/:id', deleteGoal)
}
