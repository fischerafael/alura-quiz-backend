import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL

async function connnectToMongoDB() {
    if (!MONGO_URL) {
        console.log('No MongoDB URL connection provided')
        return
    }
    await mongoose.connect(
        MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        () => console.log('Connected to MongoDB')
    )
}

export default connnectToMongoDB
