export interface Post {
  id: string;
  title: string;
  slug: string;
  lead_text: string;
  thumbnail: MicroCMSImage;
  main_content: string;
  categories: Category[];
  authors: Author[];
  publishedAt: string;
  updatedAt: string;
  revisedAt: string;
}
