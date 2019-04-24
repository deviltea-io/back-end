import { Schema, Types } from 'mongoose'

export interface CommentProperties {
  userId: string
  content: string
  createdTime: Date
  updatedTime?: Date
  deleted: boolean
}
export interface CommentMethods {}
export interface CommentDocument
  extends CommentProperties,
    CommentMethods,
    Types.Embedded {}

export const commentSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    updatedTime: {
      type: Date,
      required: false
    },
    deleted: {
      type: Boolean,
      required: true,
      default: (): boolean => false
    }
  },
  { capped: true }
)
commentSchema.virtual('createdTime').get(function (this: CommentDocument): Date {
  return this._id.getTimestamp()
})
