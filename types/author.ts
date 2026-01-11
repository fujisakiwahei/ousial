import type { MicroCMSImage } from "./common";

export interface Author {
  id: string;
  author_name: string;
  author_image: MicroCMSImage;
  author_profile: string;
}
