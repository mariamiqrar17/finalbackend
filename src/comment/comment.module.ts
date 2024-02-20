/* eslint-disable prettier/prettier */
// comments/comment.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

import { Comment, CommentSchema } from './schemas/comment.schema';
import { Article, ArticleSchema } from 'src/article/schemas/article.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Article.name, schema: ArticleSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
