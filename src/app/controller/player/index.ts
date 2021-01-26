import { Request, Response } from 'express'
import Quiz from '../../models/Quiz'

const PlayerController = {
    async create(req: Request, res: Response) {
        try {
            const { quiz_login } = req.params
            const { name, score, time } = req.body as IPlayer

            const quiz = await Quiz.findOne({ login: quiz_login })
            if (!quiz) return res.status(404).json('Quiz not found')

            quiz.players.push({ name, score, time })
            await quiz.save()

            return res.status(200).json(quiz)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

export default PlayerController

interface IPlayer {
    name: string
    score: number
    time: number
}
