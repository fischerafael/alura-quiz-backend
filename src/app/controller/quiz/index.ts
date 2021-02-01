import { Request, Response } from 'express'

const notAllowedA = process.env.NOTALLOWEDA!
const notAllowedB = process.env.NOTALLOWEDB!

import Quiz from '../../models/Quiz'

const QuizController = {
    async create(req: Request, res: Response) {
        try {
            const {
                title,
                login,
                background,
                description,
                theme
            } = req.body as IQuiz

            if (
                title.toLowerCase().includes(notAllowedA) ||
                title.toLowerCase().includes(notAllowedB)
            )
                return res.status(404).json('Error, try again later.')

            if (
                description.toLowerCase().includes(notAllowedA) ||
                description.toLowerCase().includes(notAllowedB)
            )
                return res.status(404).json('Error, try again later.')

            const hasQuiz = await Quiz.findOne({ login: login })
            if (hasQuiz) return res.status(409).json('Quiz already exists')

            const createdQuiz = await Quiz.create({
                title,
                login,
                background,
                description,
                theme
            })

            return res.status(201).json(createdQuiz)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async index(req: Request, res: Response) {
        try {
            const quizes = await Quiz.find()

            return res.status(200).json(quizes)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    async show(req: Request, res: Response) {
        try {
            const { quiz_login } = req.params

            const quiz = await Quiz.findOne({ login: quiz_login })
            if (!quiz) return res.status(404).json('Quiz not found')

            return res.status(200).json(quiz)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

export default QuizController

interface IQuiz {
    login: string
    title: string
    background: string
    description: string
    theme: {
        colors: {
            primary: string
            secondary: string
            mainBG: string
            contrastText: string
            wrong: string
            success: string
        }
        borderRadius: string
    }
}
