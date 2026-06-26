# Mock Sports API

This module provides a full-featured, in-memory mock sportsbook for development and testing. It exposes REST endpoints under `/api` and a client wrapper used by the app.

## Endpoints

- GET `/api/sidebar` — returns sport categories, countries, leagues and counts
- GET `/api/pre-match` — pre-match (UPCOMING) events
- GET `/api/live` — live events
- GET `/api/event/:id/markets` — detailed event + markets data
- POST `/api/lock` — body `{ selectionId, lockMillis? }`, locks a selection briefly
- POST `/api/bets/calc` — body `{ selections: [{ event_id, selectionId, stake }] }` calculates combined odds & payout

## Advanced behaviours

- Simulates odds movement every few seconds (small, realistic changes)
- Temporary suspensions during goals or large moves
- Odds locking for selected selections
- Multi-bet payout calculation

## Usage

Client wrapper available at `frontend/app/sports/sportsApi.ts`:

```ts
import {
  fetchPreMatch,
  fetchLive,
  fetchEventMarkets,
  lockSelection,
  calcMultiBet,
} from "./sportsApi";
```

Call these from your React components to integrate. The structure is designed to match the UI layout and be easy to replace with a real provider in the future.
