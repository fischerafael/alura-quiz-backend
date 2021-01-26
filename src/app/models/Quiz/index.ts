import mongoose from 'mongoose'

interface IQuizModel extends mongoose.Document {
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
    players?: IPlayer[]
}

interface IPlayer {
    name: string
    score: number
    time: number
}

const Schema = new mongoose.Schema({
    login: { type: String, required: true, lowercase: true },
    title: { type: String, required: true },
    background: { type: String, required: true },
    description: { type: String, required: true },
    theme: {
        colors: {
            primary: { type: String, required: true },
            secondary: { type: String, required: true },
            mainBG: { type: String, required: true },
            contrastText: { type: String, required: true },
            wrong: { type: String, required: true },
            success: { type: String, required: true }
        },
        borderRadius: { type: String, required: true }
    },
    players: [
        {
            name: { type: String, required: true },
            score: { type: Number, required: true },
            time: { type: Number, required: true }
        }
    ]
})

export default mongoose.model<IQuizModel>('Quiz', Schema)
