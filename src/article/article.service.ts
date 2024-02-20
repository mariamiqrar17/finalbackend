import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDto } from './dto/article.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<ArticleDto>,
  ) {}

  async saveCommonDataFromJson(): Promise<void> {
    try {
      const filePath = path.resolve(__dirname, '../../fake.json');
      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Insert documents in bulk without checking for duplicates
      await this.articleModel.insertMany(jsonData, { ordered: false });
      console.log('Common data saved.');
    } catch (error) {
      // Check if the error is a duplicate key error
      if (error.code === 11000) {
        console.log('Duplicate key error occurred. Skipping duplicates.');
        console.log('Error details:', error);
      } else {
        console.error('Error saving common data:', error);
      }
    }
  }

  async findAll(limit: number = 100): Promise<ArticleDto[]> {
    const articles = await this.articleModel.find().limit(limit).exec();
    return articles;
  }
}
