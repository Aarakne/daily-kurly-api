import http from 'http'
import connectMongoDB from './lib/db.helper'
import init from './app'

const port = process.env.PORT || 3000
const app = init()

const serve = async () => {
  try {
    const server = http.createServer(app)

    server.listen(port, () => {
      console.log(`${port}번 포트에서 서버가 시작되었습니다.`)
    })

    await connectMongoDB()
  } catch (err) {
    console.error(err)
  }
}

serve()

export default app
