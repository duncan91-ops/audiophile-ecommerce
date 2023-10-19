import categories from "@/data/categories.json";
import type { Category } from "@/types/category";

export function getCategories() {
  return categories as Category[];
}
