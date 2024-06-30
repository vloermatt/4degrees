# Tally Ho! - README

> for the dad 🖤

Welcome to Tally Ho!, an exciting and engaging application developed for 4 Degrees Taproom. This application adds a fun, interactive element to the bar experience by allowing patrons to bet on sports fixtures and win prizes.

Tally Ho! is a side project developed to enhance the sports-viewing experience at 4 Degrees Taproom. By utilizing a sports API, the application fetches the latest sports fixtures and results. Patrons can join a tally board by scanning a QR code, make predictions on the final scores, and compete for prizes. It's a great way to add a layer of excitement to watching sports at the bar.

## Features

- Real-Time Sports Fixtures and Results: Stay updated with the latest sports events and outcomes.
- QR Code Scanning: Easily join the tally board by scanning a QR code.
- Score Prediction: Make predictions on the final scores of the games.
- Competitive Fun: Compete with other patrons and win exciting prizes.
- User-Friendly Interface: Enjoy a seamless and intuitive user experience.

## Tech Stack

- Next.js: A React framework for building fast, user-friendly web applications.
- Tailwind CSS: A utility-first CSS framework for styling the application.
- tRPC: A framework for building typesafe APIs with TypeScript.
- TypeScript: A typed superset of JavaScript that ensures code quality and developer productivity.

## Installation

To get started with Tally Ho!, follow these steps:

Clone the repository:

```
git clone https://github.com/vloermatt/4degrees.git
cd 4degrees
```

Install dependencies:

```
yarn install
```

Set up environment variables:

```
Create a .env file in the root directory and add the necessary environment variables. Example:
```

```
DATABASE_URL="DATABASE_URL"
RUGBY_API="API_KEY"
NEXT_PUBLIC_HOST="PUBLIC_HOST"
PUSHER_APP_ID="APP_ID"
PUSHER_SECRET="PUSHER_SECRET"
PUSHER_CLUSTER="PUSHER_CLUSER"
NEXT_PUBLIC_PUSHER_KEY="PUSHER_KEY"
```

Starting the application locally

```
yarn dev
```

Open your browser:
Navigate to http://localhost:3000 to view the application.

## Usage

1. Start a tally board for a specific sports fixture
2. Every board has a QR code that patrons can scan and join in on
3. Once joined a user will pop up on the tally-board alongside their score prediction
4. Refresh the score periodically as the game plays out (Free API allows only 100 calls per day 🥲)
5. Winning bets are updated and displayed automatically!
6. Win Prizes: Patrons with the most accurate predictions win prizes and enjoy the thrill of competition.

Cheers! 🍻
