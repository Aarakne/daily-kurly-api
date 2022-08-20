import mongoose from 'mongoose'

const connectMongoDB = async () => {
  const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_URI, MONGO_COLLECTION } =
    process.env

  if (!(MONGO_USERNAME && MONGO_PASSWORD && MONGO_URI && MONGO_COLLECTION)) {
    throw new Error(
      'Please define the necessary environment variables inside .env for DB'
    )
  }

  await mongoose.connect(
    `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URI}/${MONGO_COLLECTION}`
  )

  console.log('mongoDB에 접속했습니다.')
}

export default connectMongoDB
