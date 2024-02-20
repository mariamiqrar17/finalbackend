export class ArticleDto {
  readonly _id: string;
  readonly uuid: string;
  readonly ord_in_thread: number;
  readonly author: string;
  readonly published: Date;
  readonly title: string;
  readonly text: string;
  readonly language: string;
  readonly crawled: Date;
  readonly site_url: string;
  readonly country: string;
  readonly domain_rank: number;
  readonly thread_title: string;
  readonly spam_score: number;
  readonly main_img_url: string;
  readonly replies_count: number;
  readonly participants_count: number;
  readonly likes: number;
  readonly comments: number;
  readonly shares: number;
  readonly type: string;
}
