/**
 * Client reviews. Add real, consented reviews here — empty entries render as marked placeholders.
 * Set `verified: true` only for reviews you can point to (e.g. Google, Instagram); only those show stars.
 */
export type Review = {
  text?: string;
  author?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  verified?: boolean;
  source?: "google" | "instagram" | "direct";
};

export const reviews: Review[] = [{}, {}, {}, {}, {}, {}];
