import { DeleteResult } from 'mongodb'
import { Model } from 'mongoose'
import Models from '.'

type Props = { [x: string]: any }
type List = {
  page: number
  pages: number
  count: number
  rows: Props[]
}

export default class Mongo {
  public model: typeof Model
  public entity: string

  constructor(model: string) {
    this.model = Models[model as keyof typeof Models]
    this.entity = this.model.modelName
  }

  async get(id: string): Promise<Props> {
    try {
      const result: Props | null = await this.model.findById(id)
      if (!result) throw new Error(`${this.entity} not found`)
      return result
    } catch (error) {
      console.log(error)
      throw new Error(`${this.entity} not found`)
    }
  }

  async find(filters: Props): Promise<Props | null> {
    try {
      const result: Props | null = await this.model.findOne(filters)
      return result
    } catch (error) {
      throw error
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const result: DeleteResult = await this.model.deleteOne({ _id: id })
      if (!result.deletedCount) throw new Error(`${this.entity} not found`)
      return 'Deleted successfully'
    } catch (error) {
      throw error
    }
  }

  async list(
    filters: Props,
    limit: number = 0,
    page: number = 0
  ): Promise<List> {
    try {
      const result: any = await this.model
        .find(filters)
        .limit(limit)
        .skip(limit * (page - 1))
      const count: number = await this.model.count()
      const pages: number = limit != 0 ? Math.ceil(count / limit) : 0
      return {
        page,
        pages,
        count,
        rows: result
      }
    } catch (error) {
      throw error
    }
  }

  async create(data: { [key: string]: any }): Promise<Props> {
    try {
      const result: Props = await this.model.create(data)
      return result
    } catch (error) {
      throw error
    }
  }

  async update(data: { [key: string]: any }): Promise<Props> {
    try {
      const { id, ...props } = data
      const result: Props = await this.model.updateOne({ _id: id }, props)
      return result
    } catch (error) {
      throw error
    }
  }
}
