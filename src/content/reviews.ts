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

export const reviews: Review[] = [
  {
    // Instagram DM from @_stiffnichek_, a week after the treatment (cropped to the message only).
    text: "Wszystko jest super, jestem bardzo zadowolona. Nie pojawiły się żadne niepożądane reakcje ani problemy. Stosuję się do wszystkich zaleceń i wykonuję pielęgnację tak, jak mi mówiłaś. Jak na razie wszystko idealnie, dziękuję ci bardzo jeszcze raz.",
    author: "Inna",
    source: "instagram",
    screenshot: "reviews/inna.webp",
  },
];
