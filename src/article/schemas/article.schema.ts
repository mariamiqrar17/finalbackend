import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  _id: String;
  uuid: String;
  ord_in_thread: Number;
  author: String;
  published: Date;
  title: String;
  text: String;
  language: String;
  crawled: Date;
  site_url: String;
  country: String;
  domain_rank: Number;
  thread_title: String;
  spam_score: Number;
  main_img_url: String;
  replies_count: Number;
  participants_count: Number;
  likes: Number;
  comments: Number;
  shares: Number;
  type: String;
}
export const ArticleSchema = SchemaFactory.createForClass(Article);
