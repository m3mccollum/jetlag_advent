// Advent data, derived from "Advent Spec Sheet - Winners.csv".
// `videos` entries: id = YouTube video id, t = start time in seconds (taken from the CSV's timestamp links).
window.ADVENT_YEAR = 2026;

window.SNACKS = [
  { day: 1,  snack: "Rashuns (Cheesy Bacon Attack flavor)", storage: "Pantry", season: "5", episode: 2, country: "New Zealand", flavor: "Sharable Savory", videos: [{ id: "hfOy7pb0xXk", t: 63 }] },
  { day: 2,  snack: "Bluebird Potato Chips (Thinly Cut – Ready Salted)", storage: "Pantry", season: "5", episode: 2, country: "New Zealand", flavor: "Sharable Savory", videos: [{ id: "hfOy7pb0xXk", t: 1531 }] },
  { day: 3,  snack: "Burger Rings", storage: "Pantry", season: "5", episode: 3, country: "New Zealand", flavor: "Sharable Savory", videos: [{ id: "C30lQzcEhx0", t: 796 }] },
  { day: 4,  snack: "Baked Oaty Slices (Afghan flavor)", storage: "Pantry", season: "5", episode: 5, country: "New Zealand", flavor: "Other", videos: [{ id: "8FMN7zHB5BA", t: 707 }] },
  { day: 5,  snack: "Weet-Bix", storage: "Pantry", season: "5", episode: 8, country: "New Zealand", flavor: "Other", videos: [{ id: "35GVK6iOnbY", t: 337 }] },
  { day: 6,  snack: "Starbucks", storage: "Pantry", season: "6", episode: 3, country: "Japan", flavor: "Other", videos: [{ id: "7S54BYznHi8", t: 1607 }] },
  { day: 7,  snack: "Trolli Saure Glühwürmchen", storage: "Pantry", season: "7", episode: 3, country: "Germany", flavor: "Sweet", videos: [{ id: "jrTIrJmph2A", t: 1588 }] },
  { day: 8,  snack: "Cracker Jill", storage: "Pantry", season: "8", episode: 2, country: "United States", flavor: "Sharable Sweet", videos: [{ id: "NFPQW7gQ6Ho", t: 240 }] },
  { day: 9,  snack: "Sport Beans", storage: "Pantry", season: "9", episode: 4, country: "Switzerland", flavor: "Sweet", videos: [{ id: "62NKEFWavKA", t: 2466 }] },
  { day: 10, snack: "Tim Tam", storage: "Pantry", season: "10", episode: 2, country: "Australia", flavor: "Sharable Sweet", videos: [{ id: "abwiCon6IjU", t: 815 }] },
  { day: 11, snack: "Snack di Parmigiano Reggiano", storage: "Refrigerator", season: "11", episode: 1, country: "Italy", flavor: "Savory", videos: [{ id: "hsoiHKaqG2s", t: 1205 }] },
  { day: 12, snack: "Mochi, Strawberry Flavored", storage: "Freezer", season: "12", episode: 1, country: "Japan", flavor: "Sharable Sweet", videos: [{ id: "PHjkSKQSzv4", t: 2961 }] },
  { day: 13, snack: "Dango", storage: "Freezer", season: "12", episode: 1, country: "Japan", flavor: "Other", videos: [{ id: "PHjkSKQSzv4", t: 2961 }] },
  { day: 14, snack: "Lotte Coolish Vanilla Ice Cream", storage: "Freezer", season: "12", episode: 7, country: "Japan", flavor: "Sweet", videos: [{ id: "5UAM-ZKBcZs", t: 1231 }] },
  { day: 15, snack: "Trader Joe's Jingle Jangle", storage: "Pantry", season: "13.5", episode: 1, country: "United States", flavor: "Sharable Sweet", videos: [{ id: "Zftv6Kh2zi4", t: 3145 }] },
  { day: 16, snack: "Orion Kkobuk Chip (Corn Soup flavor)", storage: "Pantry", season: "14", episode: 4, country: "South Korea", flavor: "Sharable Savory", videos: [{ id: "2AriH2BNp4E", t: 508 }] },
  { day: 17, snack: "Carbonara Buldak", storage: "Pantry", season: "14", episode: 5, country: "South Korea", flavor: "Meal",
    videos: [{ id: "C4w4jl4ODAk", t: 343, label: "Season 14, Ep 5" }, { id: "2AriH2BNp4E", t: 2070, label: "Season 14, Ep 4" }] },
  { day: 18, snack: "Nutella Biscuits", storage: "Pantry", season: "15", episode: 3, country: "France", flavor: "Sweet", videos: [{ id: "wQQ9FOdzWGE", t: 1355 }] },
  { day: 19, snack: "Tunnock's Milk Chocolate Caramel Wafer Biscuits", storage: "Pantry", season: "16", episode: 5, country: "United Kingdom", flavor: "Sweet", videos: [{ id: "-uQ5c-gl89A", t: 2285 }] },
  { day: 20, snack: "Lotte Coolish Vanilla Ice Cream", storage: "Freezer", season: "17", episode: 1, country: "Taiwan", flavor: "Sweet", videos: [{ id: "QUGHPuUU5FA", t: 2096 }] },
  { day: 21, snack: "Garlic Prawn Doritos", storage: "Pantry", season: "17", episode: 6, country: "Taiwan", flavor: "Savory", videos: [{ id: "76C3VtR2NYQ", t: 1056 }] },
  { day: 22, snack: "Steamed Barbecue Pork Bun", storage: "Freezer", season: "17", episode: 6, country: "Taiwan", flavor: "Sharable Savory", videos: [{ id: "76C3VtR2NYQ", t: 1940 }] },
  { day: 23, snack: "Dried Waxberries", storage: "Pantry", season: "17", episode: 6, country: "Taiwan", flavor: "Other", videos: [{ id: "76C3VtR2NYQ", t: 1940 }] },
  { day: 24, snack: "Pocari Sweat", storage: "Refrigerator", season: "19", episode: 2, country: "Japan", flavor: "Drink", videos: [{ id: "CSksN3XLepQ", t: 2001 }] }
];
