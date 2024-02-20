import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger'; 

import { ArticleDto } from './dto/article.dto';
import { ArticleService } from './article.service';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}

  @Get('/save-common-data')
  @ApiOperation({
    summary: 'Save common data from JSON',
    description: 'Endpoint to save common data from JSON.',
  })
  async saveCommonData(): Promise<string> {
    try {
      await this.articlesService.saveCommonDataFromJson();
      return 'Common data saved successfully.';
    } catch (error) {
      console.error('Error saving common data:', error);
      return 'Failed to save common data.';
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Find all articles',
    description: 'Endpoint to retrieve all articles.',
  }) // Add Swagger operation description
  async findAll(): Promise<ArticleDto[]> {
    return this.articlesService.findAll();
  }
}
