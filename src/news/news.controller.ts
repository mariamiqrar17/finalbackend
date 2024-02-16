import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get('/getCount')
  async getCount() {
    const count = await this.newsService.getDocsCount();
    return { count };
  }
  // returns paginated news
  @Get('/')
  async getNews(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
    const totalNews = await this.newsService.getDocsCount();
    const paginated = await this.newsService.paginatedNews(page, pageSize);
    const totalPages = Math.ceil(totalNews / pageSize);
    return { totalNews, page, pageSize, paginated, totalPages };
  }
  // get single news
  @Get(':id')
  @UseGuards(AuthGuard())
  async getNewsDetails(@Param() id: string) {
    if (!id) {
      throw new NotFoundException('Id not found');
    }
    const objId = this.newsService.objectIdConversion(id);
    const news = await this.newsService.singleNews(objId);
    if (!news) {
      throw new NotFoundException(
        'Invalid id sent. News with this id does not exist!',
      );
    }
    return { success: true, news };
  }
}
