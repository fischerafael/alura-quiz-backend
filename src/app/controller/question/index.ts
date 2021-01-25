import { Request, Response } from 'express'
import Question from '../../models/Question'
import Quiz from '../../models/Quiz'

const QuestionController = {
    async create(req: Request, res: Response) {
        try {
            const {
                image,
                title,
                description,
                answer,
                alternatives
            } = req.body as IQuestion
            const quiz = req.headers.quiz as string

            const hasQuiz = await Quiz.findById(quiz)
            if (!hasQuiz) return res.status(400).json('Quiz does not exist')

            const createdQuestion = await Question.create({
                image,
                title,
                description,
                answer,
                alternatives,
                quiz
            })
            await createdQuestion.populate('quiz').execPopulate()

            return res.status(201).json(createdQuestion)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async index(req: Request, res: Response) {
        try {
            const { quiz_login } = req.params

            const quiz = await Quiz.findOne({ login: quiz_login })
            if (!quiz) return res.status(404).json('Quiz not found')

            const quizQuestions = await Question.find({ quiz: quiz._id })

            return res.status(200).json(quizQuestions)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

export default QuestionController

interface IQuestion {
    image: string
    title: string
    description: string
    answer: string
    alternatives: string[]
}
