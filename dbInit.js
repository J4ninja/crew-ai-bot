const Database = require("better-sqlite3");

const db = new Database("database.db");

const query = `

DROP TABLE IF EXISTS quotes;

CREATE TABLE IF NOT EXISTS quotes
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text STRING UNIQUE,
    author STRING
    );
`

db.exec(query);


const quotes = [
    { text: "97943", author: "The Gang" },
    { text: "Would you wear a large coat?", author: "John" },
    { text: "Hi best friend", author: "Tony" },
    { text: "Money coming in, coming out, all around", author: "Arthur" },
    { text: "I like eating ass", author: "Raf" },
    { text: "Stop playing Dead Island", author: "Arthur" },
    { text: "Tossin one off", author: "Arthur" },
    { text: "Corrin's my main", author: "John" },
    { text: "Texas changed you", author: "Tony" },
    { text: "No more furries", author: "Tony" },
    { text: "Im gay", author: "Raf" },
    { text: "Who are you people", author: "Jacob" },
    { text: "I forgot how to play", author: "Jacob" },
    { text: "Garry's Stove", author: "Arthur" },
    { text: "Bless me, thank you", author: "Steve" },
    { text: "John's mom", author: "Steve" },
    { text: "JV lacrosse practice", author: "Quiplash" },
    { text: "Don't shoot, this man isn't black", author: "Trunks" },
    { text: "Big Shaq", author: "Arthur" },
    { text: "and one", author: "Lucas,Raf" },
    { text: "beat it as a team", author: "Arthur" },
    { text: "AACCCHOOOO!!!", author: "Joseph" },
    { text: "*harmonica screeching*", author: "Emma" },
    { text: "I'm not a weeb, I'm a pervert", author: "Steve" },
    { text: "MONGOLIAN BEEF", author: "Raf" },
    { text: "How big is your cucumber patch?", author: "Alex" },
    { text: "How did I die -oh yah clan, must've been something stupid", author: "Joseph" },
    { text: "ALLOW IT", author: "Ahmed" },
    { text: "PAUSE", author: "Ahmed" },
    { text: "Spedmobile", author: "Ahmed" },
    { text: "POV, You're my wife", author: "Raf" },
    { text: "It's so big", author: "Arthur" },
    { text: "LET YOUR NUTS HANG!", author: "Ahmed" },
    { text: "I'm gonna be the number one american, believe it", author: "John" },
    { text: "I'm tired of these headphones, I'm gonna put on my sunglasses", author: "Joseph" },
    { text: "I'm not haitian", author: "Arthur" },
    { text: "I want thy dick", author: "Steve" },
    { text: "They stole my NUT!", author: "John" },
    { text: "The sun will shine another day", author: "Steve" },
    { text: "You fucking immigrant", author: "Steve" },
    { text: "Trust trust trust", author: "Steve" },
    { text: "Hello there, newcomer. My name's Miles.", author: "Miles" },
    { text: "You know my stance on asians. I hate them", author: "Steve Le 2021" },
    { text: "What are you doing step ladder?", author: "Steve" },
    { text: "Hello, Flaming Grill. YALL OPEN? WHAT TIME YOU CLOSE? -Customers on the phone", author: "Raf" }
  ];

  const insertData = db.prepare("INSERT INTO quotes (text, author) VALUES(?, ?)");

  quotes.forEach((quote) => {
    insertData.run(quote.text, quote.author);
  })

  // Create games table if it doesn't exist
const createGamesTableQuery = `
DROP TABLE IF EXISTS games;
CREATE TABLE IF NOT EXISTS games
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title STRING UNIQUE
)
`;

db.exec(createGamesTableQuery);

// Insert initial games
const games = [
    "League of Legends", "Helldivers", "Balatro", 
    "Brawl", "Jackbox", "Fortnite",
    "Ravenswatch", "V Rising", "Black ops 6"
];

const insertGame = db.prepare("INSERT INTO games (title) VALUES (?)");
for (const game of games) {
    insertGame.run(game);
}
  