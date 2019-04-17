import { model, Model, Document, Schema } from 'mongoose'

export interface CommentProperties {}
export interface CommentMethods {}
export interface CommentDocument
  extends CommentProperties,
    CommentMethods,
    Document {}
export interface CommentStatics {}
export interface CommentModel extends CommentStatics, Model<CommentDocument> {}

const commentSchema: Schema = new Schema()
export const Comment: CommentModel = model<CommentDocument, CommentModel>(
  'Comment',
  commentSchema
)
