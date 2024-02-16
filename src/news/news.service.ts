import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './schema/news.schema';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: mongoose.Model<News>){}
  // returns all numbers of news
  async getDocsCount() {
    return await this.newsModel.countDocuments();
  } 
  // returns paginated news
  async paginatedNews(page:number, pageSize:number) {
    return await this.newsModel.find().skip((page - 1) * pageSize).limit(Number(pageSize)).exec();
  }
  // return news by id
  async singleNews(id:ObjectId){
    return await this.newsModel.findById(id);
  }
  // convert string to object id
  objectIdConversion(id:string){
    const objectId = new ObjectId(id);
    return objectId;
  }
}
