import { model, Model, Document, Schema } from 'mongoose'

export interface ArticleProperties {
  coverUrl: string
  title: string
  tags: string[]
  content: string
  viewCount: number
  createdTime: Date
  updatedTime?: Date
}
export interface ArticleMethods {}
export interface ArticleDocument
  extends ArticleProperties,
    ArticleMethods,
    Document {}
export interface ArticleStatics {}
export interface ArticleModel extends ArticleStatics, Model<ArticleDocument> {}

const articleSchema: Schema = new Schema({
  coverUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  viewCount: {
    type: Number,
    required: true,
    default: (): number => 0
  },
  updatedTime: {
    type: Date,
    required: false
  }
})
articleSchema.virtual('createdTime').get(function (this: ArticleDocument): Date {
  return this._id.getTimestamp()
})
export const Article: ArticleModel = model<ArticleDocument, ArticleModel>(
  'Article',
  articleSchema
)
