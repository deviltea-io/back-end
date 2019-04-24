import { model, Model, Document, Schema, Types } from 'mongoose'
import { commentSchema, CommentDocument } from './comment'

export interface ArticleProperties {
  coverUrl: string
  title: string
  tags: string[]
  content: string
  viewCount: number
  commentCount: number
  createdTime: Date
  updatedTime?: Date
  deleted: boolean
  password: string
  comments: Types.DocumentArray<CommentDocument>
  locked: boolean
}
export interface ArticleMethods {}
export interface ArticleDocument
  extends ArticleProperties,
    ArticleMethods,
    Document {}
export interface ArticleStatics {}
export interface ArticleModel extends ArticleStatics, Model<ArticleDocument> {}

const articleSchema: Schema = new Schema(
  {
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
      required: true,
      default: (): string[] => ['未分類']
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
    },
    deleted: {
      type: Boolean,
      required: true,
      default: () => false
    },
    password: {
      type: String,
      required: false,
      default: () => ''
    },
    comments: {
      type: [commentSchema],
      required: true,
      default: (): Types.DocumentArray<CommentDocument> =>
        new Types.DocumentArray<CommentDocument>()
    }
  },
  { capped: true }
)
articleSchema.virtual('createdTime').get(function (this: ArticleDocument): Date {
  return this._id.getTimestamp()
})
articleSchema.virtual('locked').get(function (this: ArticleDocument): boolean {
  return !!this.password
})
articleSchema
  .virtual('commentCount')
  .get(function (this: ArticleDocument): number {
    return this.comments.length
  })

export const Article: ArticleModel = model<ArticleDocument, ArticleModel>(
  'Article',
  articleSchema
)
