import { model, Model, Document, Schema, DocumentQuery } from 'mongoose'

export enum Permission {
  Admin,
  Member
}

export interface UserProperties {
  oAuthUid: string
  name: string
  email: string
  avatarUrl: string
  permission: number
}
export interface UserMethods {}
export interface UserDocument extends UserProperties, UserMethods, Document {}
export interface UserStatics {
  findByOAuthUid (
    oAuthUid: string
  ): DocumentQuery<UserDocument | null, UserDocument, {}>
}
export interface UserModel extends UserStatics, Model<UserDocument> {}

const userSchema: Schema = new Schema({
  oAuthUid: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: true
  },
  permission: {
    type: Number,
    required: true,
    default: (): number => Permission.Member
  }
})
userSchema.statics.findByOAuthUid = function (
  this: UserModel,
  oAuthUid: string
): DocumentQuery<UserDocument | null, UserDocument, {}> {
  return this.findOne({ oAuthUid })
}

export const User: UserModel = model<UserDocument, UserModel>(
  'User',
  userSchema
)
