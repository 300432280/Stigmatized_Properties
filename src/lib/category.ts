import type { IncidentCategory, MainCategory } from "./types";

export const CATEGORIES: Record<MainCategory, IncidentCategory[]> = {
  "Public Safety": ["Homicide", "Death", "Suicide", "Organized Crime"],
  "Property Condition": ["Grow-op / Drug Lab", "Fire", "Flood", "Hoarding"],
  Supernatural: ["Paranormal / Alleged Haunting", "Urban Legend"],
  "Commercial / Civic": ["Major Commercial Incident"],
  "Notorious Association": ["Notorious Owner"]
};

export function mainCategoryFor(category: IncidentCategory): MainCategory {
  for (const [main, categories] of Object.entries(CATEGORIES) as Array<[MainCategory, IncidentCategory[]]>) {
    if (categories.includes(category)) return main;
  }

  return "Public Safety";
}

export function softLabel(mainCategory: MainCategory) {
  switch (mainCategory) {
    case "Public Safety":
      return "Sensitive record";
    case "Property Condition":
      return "Property condition record";
    case "Supernatural":
      return "Reported history";
    case "Commercial / Civic":
      return "Commercial record";
    case "Notorious Association":
      return "Notable history";
  }
}
