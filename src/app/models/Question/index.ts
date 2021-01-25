import mongoose from 'mongoose'

interface IQuestionModel extends mongoose.Document {
    image: string
    title: string
    description: string
    answer: string
    alternatives: string[]
    quiz: string
}

const Schema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    answer: { type: String, required: true },
    alternatives: [{ type: String, required: true }],
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }
})

export default mongoose.model<IQuestionModel>('Question', Schema)
