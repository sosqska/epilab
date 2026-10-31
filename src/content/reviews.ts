/**
 * Client reviews. Add only real reviews, published with the client's consent, and give each one a source
 * people can check: a `url` to the original (Google review, Instagram post/story highlight) and/or a
 * `screenshot` (put the image in public/images/reviews/ and use e.g. "reviews/anna.webp").
 * While the list is empty, the home page hides its reviews section and /opinie points to Instagram.
 */
export type Review = {
  text: string;
  author: string;
  source: "google" | "instagram";
  rating?: 1 | 2 | 3 | 4 | 5;
  url?: string;
  screenshot?: string;
};

export const reviews: Review[] = [];
