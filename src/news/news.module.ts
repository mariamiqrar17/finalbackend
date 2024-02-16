import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { newsSchema } from './schema/news.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: 'News', schema: newsSchema }]),],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
