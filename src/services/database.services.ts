import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a9w5cgk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  // ko de finally vi no se dong ngay sau khi ket noi thanh cong
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.USER_COLLECTION as string)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.REFRESH_TOKENS_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
