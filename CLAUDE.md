# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kongtrac.kr is a competitive gaming tracker for Donkey Kong arcade games. It's built as an Angular 8/AngularJS hybrid application with a Node.js backend for data processing.

## Key Commands

### Development
- `ng serve` - Start development server (http://localhost:4200)
- `npm start` - Start production server (runs server.js)
- `npm run build` - Build for production (Angular build with optimization disabled)

### Testing
- `npm test` - Run Jest unit tests
- `npm test -- --watch` - Run Jest in watch mode
- `npm test -- path/to/test.spec.ts` - Run a specific test file
- `npm run e2e` - Run Cypress E2E tests

### Code Quality
- `npm run lint` - Run TSLint on the codebase

## Architecture

### Frontend Structure
The main Angular application is in `/apps/kongtrackr/src/app/`:
- **Module-based architecture** with lazy-loaded routes
- **Hybrid approach**: Angular 8 components coexist with AngularJS components (using downgradeModule)
- **State Management**: Akita stores in the ranking module (`/apps/kongtrackr/src/app/ranking/state/`)
- **Routing**: UI Router for AngularJS compatibility + Angular Router

### Key Modules
- `auth/` - Firebase authentication
- `ranking/` - Leaderboards with Akita state management (stores, queries, services)
- `game/` - Game visualization and statistics
- `player/` - Player profiles and personal records
- `submit/` - Score submission with validation
- `compare/` - Comparison views for players/games/events

### Backend Services
Located in `/server/`:
- Node.js scripts for batch processing and statistics generation
- Algolia search integration for the search functionality
- Firebase integration for data storage

### Styling
- SCSS with Bootstrap 3 and Angular Material
- Global styles in `/apps/kongtrackr/src/styles.scss`
- Component-specific styles use ViewEncapsulation

### Important Patterns
1. **Services**: Always inject in constructor, use `providedIn: 'root'` for new services
2. **Components**: Use OnPush change detection where possible
3. **Observables**: Prefer RxJS operators over imperative code
4. **AngularJS Integration**: Use downgradeComponent/upgradeComponent for hybrid components

## Development Notes

### When Creating New Features
1. Check if the feature should be Angular or AngularJS (prefer Angular for new features)
2. For state management in rankings, use Akita patterns (see `/apps/kongtrackr/src/app/ranking/state/`)
3. Use Angular Material components where appropriate
4. Follow existing routing patterns with lazy loading

### Testing Approach
- Unit tests use Jest with Angular testing utilities
- Mock Firebase services in tests
- E2E tests use Cypress for critical user flows

### Common Gotchas
- The app uses both UI Router (AngularJS) and Angular Router
- Bootstrap 3 is used (not 4+), so use appropriate classes
- Firebase configuration is environment-specific
- Production build has optimization disabled due to legacy code constraints