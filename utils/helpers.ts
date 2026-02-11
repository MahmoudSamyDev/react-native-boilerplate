import { recommendations } from "@/constants/data";

export function filterRecommendationsByCategory(selectedCategory: string) {
  if (selectedCategory === "All") {
    return recommendations;
  }
  return recommendations.filter(
    (item) => item.category.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase(),
  );
}
