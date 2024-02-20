/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Article } from 'src/article/schemas/article.schema';
import { User } from 'src/auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Article',
    required: true,
  })
  article: Article;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
