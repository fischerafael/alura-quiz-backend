import { Router } from 'express'
import QuestionController from '../controller/question'
import QuizController from '../controller/quiz'
import SessionController from '../controller/session'

const routes = Router()

routes.get('/', (req, res) => res.send('olá mundo'))

routes.post('/quiz', QuizController.create)
routes.get('/quiz', QuizController.index)
routes.get('/quiz/:quiz_login', QuizController.show)

routes.post('/quiz/questions', QuestionController.create)
routes.get('/quiz/:quiz_login/questions', QuestionController.index)

routes.post('/session', SessionController.create)

export default routes
