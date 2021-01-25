import { Request, Response } from 'express'
import Quiz from '../../models/Quiz'

const SessionController = {
    async create(req: Request, res: Response) {
        const { login } = req.body as { login: string }

        const quiz = await Quiz.findOne({ login: login })
        if (!quiz) return res.status(404).json('Unauthorized')

        return res.status(200).json(quiz)
    }
}

export default SessionController
