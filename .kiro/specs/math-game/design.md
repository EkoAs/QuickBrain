# Design Document: Math Game

## Overview

The Math Game is a client-side web application that provides seven distinct mathematical game modes through a modular architecture. The application emphasizes separation of concerns, with each game mode encapsulated in its own HTML, CSS, and JavaScript files, while common functionality (sound effects, transitions, shared styling) is centralized in parent modules.

**Key Design Principles:**
- **Modularity**: Each game mode is self-contained and independently maintainable
- **Separation of Concerns**: HTML structure, CSS styling, and JavaScript logic are kept separate
- **Reusability**: Common functionality is centralized to avoid duplication
- **Scalability**: New game modes can be added without modifying existing ones

**Technology Stack:**
- Pure HTML5, CSS3, and vanilla JavaScript (no frameworks)
- Client-side only (no server required)
- Static file structure for easy deployment

## Architecture

### High-Level Architecture

The application follows a hierarchical navigation pattern:

```
Welcome Page (index.html)
    ↓
Main Menu (menu-utama.html)
    ↓
┌─────────┬─────────┬─────────┬─────────┬─────────┬─────────┬─────────┐
Mode 1    Mode 2    Mode 3    Mode 4    Mode 5    Mode 6    Mode 7
Multiply  Addition  Subtract  Division  Target   Middle   Memory
```

### Directory Structure

```
/
├── index.html                  # Welcome page entry point
└── data/
    ├── view/
    │   ├── menu-utama.html     # Main menu
    │   └── all-mode/
    │       ├── 1-multiplication.html
    │       ├── 2-addition.html
    │       ├── 3-subtraction.html
    │       ├── 4-division.html
    │       ├── 5-target.html
    │       ├── 6-middle-value.html
    │       └── 7-memory.html
    ├── css/
    │   ├── main.css            # Shared styles
    │   └── mode-css/
    │       ├── 1-multiplication.css
    │       ├── 2-addition.css
    │       ├── 3-subtraction.css
    │       ├── 4-division.css
    │       ├── 5-target.css
    │       ├── 6-middle-value.css
    │       └── 7-memory.css
    └── js/
        ├── main.js             # Shared functionality
        └── logic/
            ├── 1-multiplication.js
            ├── 2-addition.js
            ├── 3-subtraction.js
            ├── 4-division.js
            ├── 5-target.js
            ├── 6-middle-value.js
            └── 7-memory.js
```

### Module Dependencies

**Shared Modules:**
- `main.css`: Provides base styling, layout utilities, and common UI patterns
- `main.js`: Provides sound effect playback and page transition animations

**Game Mode Modules:**
Each game mode consists of three files that work together:
- HTML file: Defines the structure and UI elements
- CSS file: Provides mode-specific styling
- JS file: Implements game logic, problem generation, and answer validation

**Dependency Flow:**
- All pages depend on `main.css` and `main.js`
- Each game mode HTML depends on its corresponding CSS and JS
- Game mode JS files can call functions from `main.js`

### Navigation Flow

1. **Entry**: User loads `index.html` (welcome page)
2. **Menu**: User clicks to navigate to `data/view/menu-utama.html`
3. **Mode Selection**: User selects one of seven game modes
4. **Game Play**: User interacts with the selected game mode
5. **Return**: User can navigate back to main menu (implementation in each mode)

## Components and Interfaces

### 1. Welcome Page Component

**File**: `index.html`

**Purpose**: Serves as the application entry point and introduction

**Interface**:
- Dependencies: `main.css`, `main.js`
- Provides: Navigation button/link to main menu
- Events: Click handler to navigate to menu

**Responsibilities**:
- Display welcome message and game description
- Provide clear call-to-action to start
- Apply consistent styling via main.css

### 2. Main Menu Component

**File**: `data/view/menu-utama.html`

**Purpose**: Displays all available game modes for selection

**Interface**:
- Dependencies: `main.css`, `main.js`
- Provides: Seven clickable game mode options
- Events: Click handlers for each mode button

**Responsibilities**:
- Display seven mode options (Mode 1 through Mode 7)
- Navigate to corresponding game mode file on selection
- Apply transition effects via main.js
- Maintain consistent layout and styling

### 3. Game Mode Components

Each game mode follows the same architectural pattern:

**Files**: 
- `data/view/all-mode/{n}-{name}.html`
- `data/css/mode-css/{n}-{name}.css`
- `data/js/logic/{n}-{name}.js`

**Common Interface** (all modes):
```javascript
// Expected functions in each logic module
function initGame()           // Initialize game state
function generateProblem()    // Create a new problem
function checkAnswer(answer)  // Validate user input
function updateScore()        // Update score display
function resetGame()          // Reset to initial state
```

**Mode-Specific Behaviors**:

#### Mode 1: Multiplication
- Generates two random numbers
- Presents multiplication problem (a × b = ?)
- Validates numeric answer

#### Mode 2: Addition
- Generates two or more random numbers
- Presents addition problem (a + b = ?)
- Validates numeric answer

#### Mode 3: Subtraction
- Generates two random numbers
- Presents subtraction problem (a - b = ?)
- Validates numeric answer

#### Mode 4: Division
- Generates divisible number pairs
- Presents division problem (a ÷ b = ?)
- Validates numeric answer

#### Mode 5: Target Mode
- Generates target number and set of operands
- User must combine operands to reach target
- Validates if target is achieved

#### Mode 6: Middle Value
- Generates sequence of numbers
- User must identify the median/middle value
- Validates numeric answer

#### Mode 7: Memory
- Displays sequence of numbers temporarily
- User must recall and reproduce sequence
- Validates sequence match

### 4. Shared Functionality Module

**File**: `data/js/main.js`

**Purpose**: Provides common functionality to all game modes

**Interface**:
```javascript
// Sound Effects
function playSound(soundType)  // Play success/error/click sounds

// Transitions
function transitionTo(targetUrl)  // Animate page transition
function fadeIn(element)          // Fade in animation
function fadeOut(element)         // Fade out animation
```

**Responsibilities**:
- Manage sound effect playback
- Provide smooth page transitions
- Offer reusable animation functions

### 5. Shared Styling Module

**File**: `data/css/main.css`

**Purpose**: Provides common styling across the application

**Scope**:
- Reset/normalize styles
- Typography base styles
- Layout utilities (flexbox, grid)
- Button base styles
- Color scheme and theme variables
- Responsive breakpoints
- Transition/animation utilities

## Data Models

### Game State Model

Each game mode maintains its own state structure. Here's a common pattern:

```javascript
const gameState = {
  currentProblem: {
    question: String,      // Display text for problem
    answer: Number|Array,  // Correct answer(s)
    operands: Array       // Numbers used in problem
  },
  score: {
    correct: Number,      // Count of correct answers
    incorrect: Number,    // Count of incorrect answers
    streak: Number        // Current correct streak
  },
  difficulty: {
    level: Number,        // Current difficulty level
    range: Object         // Min/max values for number generation
  },
  isActive: Boolean       // Whether game is in progress
}
```

### Navigation Model

```javascript
const navigationPaths = {
  welcome: "/index.html",
  mainMenu: "/data/view/menu-utama.html",
  modes: {
    1: "/data/view/all-mode/1-multiplication.html",
    2: "/data/view/all-mode/2-addition.html",
    3: "/data/view/all-mode/3-subtraction.html",
    4: "/data/view/all-mode/4-division.html",
    5: "/data/view/all-mode/5-target.html",
    6: "/data/view/all-mode/6-middle-value.html",
    7: "/data/view/all-mode/7-memory.html"
  }
}
```

### File Path Model

The application expects files at specific paths:

```javascript
const fileStructure = {
  root: {
    html: ["index.html"],
    data: {
      view: {
        html: ["menu-utama.html"],
        allMode: [
          "1-multiplication.html",
          "2-addition.html",
          "3-subtraction.html",
          "4-division.html",
          "5-target.html",
          "6-middle-value.html",
          "7-memory.html"
        ]
      },
      css: {
        main: ["main.css"],
        modeCss: [
          "1-multiplication.css",
          "2-addition.css",
          "3-subtraction.css",
          "4-division.css",
          "5-target.css",
          "6-middle-value.css",
          "7-memory.css"
        ]
      },
      js: {
        main: ["main.js"],
        logic: [
          "1-multiplication.js",
          "2-addition.js",
          "3-subtraction.js",
          "4-division.js",
          "5-target.js",
          "6-middle-value.js",
          "7-memory.js"
        ]
      }
    }
  }
}
```

### Sound Effect Model

```javascript
const sounds = {
  correct: "path/to/correct.mp3",    // Played on correct answer
  incorrect: "path/to/incorrect.mp3", // Played on wrong answer
  click: "path/to/click.mp3",        // Played on button click
  transition: "path/to/transition.mp3" // Played on page change
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Complete File Structure Validation

*For any* deployment of the application, the file system SHALL contain exactly the expected structure: index.html at root; a data/ directory containing view/, css/, and js/ subdirectories; view/ containing menu-utama.html and all-mode/ with seven game mode HTML files; css/ containing main.css and mode-css/ with seven CSS files; and js/ containing main.js and logic/ with seven JS files, all with the correct names.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1**

### Property 2: Game Mode HTML-CSS Dependency

*For any* game mode HTML file in the all-mode/ directory, the file SHALL contain a link element that references its corresponding CSS file in the mode-css/ directory with a matching numbered prefix.

**Validates: Requirements 4.2, 5.2, 6.2, 7.2, 8.2, 9.2, 10.2**

### Property 3: Game Mode HTML-JS Dependency

*For any* game mode HTML file in the all-mode/ directory, the file SHALL contain a script element that references its corresponding JavaScript file in the logic/ directory with a matching numbered prefix.

**Validates: Requirements 4.3, 5.3, 6.3, 7.3, 8.3, 9.3, 10.3**

### Property 4: HTML File Naming Convention

*For any* HTML file in the application, the file name SHALL use only lowercase letters, hyphens, and numbers, with no uppercase characters or underscores.

**Validates: Requirements 13.2**

### Property 5: Game Mode File Numbering

*For any* set of game mode files (HTML, CSS, or JS), the files SHALL be prefixed with sequential numbers 1 through 7, and the numbering SHALL be consistent across all three file types (HTML, CSS, JS) for each game mode.

**Validates: Requirements 13.3**

### Property 6: English-Only File Names

*For any* file in the application, the file name SHALL contain only ASCII characters (a-z, A-Z, 0-9, hyphens, periods, and forward slashes for paths), excluding non-English characters or words from other languages.

**Validates: Requirements 11.4, 13.1**

### Property 7: Main Menu Navigation Links

*For any* game mode option (1-7) displayed in the main menu, clicking that option SHALL navigate to the corresponding game mode HTML file in the all-mode/ directory with the correct numbered prefix and name.

**Validates: Requirements 3.3**

### Property 8: Shared Dependency Inclusion

*For any* HTML file (index.html, menu-utama.html, or game mode files), the file SHALL include references to main.css and main.js to access shared styling and functionality.

**Validates: Requirements 2.3, 2.4, 3.4, 3.5**

## Error Handling

### File Loading Errors

**Problem**: HTML, CSS, or JavaScript files fail to load
- **Detection**: Browser console errors, missing styles, non-functional JavaScript
- **Handling**: 
  - Implement proper error event listeners on script and link tags
  - Display user-friendly error messages if critical resources fail to load
  - Provide fallback UI with instructions to refresh or check connection

### Navigation Errors

**Problem**: Invalid paths or broken links between pages
- **Detection**: 404 errors, clicking links that don't navigate
- **Handling**: 
  - Use relative paths consistently
  - Test all navigation paths during development
  - Implement error boundaries that catch navigation failures
  - Provide "Return to Menu" option on all game mode pages

### Game Logic Errors

**Problem**: JavaScript errors in game mode logic modules
- **Detection**: Runtime errors, game not functioning correctly
- **Handling**: 
  - Wrap game logic in try-catch blocks
  - Log errors to console with descriptive messages
  - Gracefully degrade functionality or reset game state
  - Validate user input before processing

### Sound Effect Errors

**Problem**: Audio files fail to load or playback is not supported
- **Detection**: Audio element errors, no sound playback
- **Handling**: 
  - Make sound effects optional (game works without them)
  - Check for audio support before attempting playback
  - Fail silently if sounds can't play (don't block game functionality)
  - Provide visual feedback as alternative to audio cues

### Browser Compatibility Issues

**Problem**: Application doesn't work in certain browsers
- **Detection**: Testing across different browsers
- **Handling**: 
  - Use standard, widely-supported HTML5/CSS3/ES6 features
  - Provide browser compatibility warnings for very old browsers
  - Test in major browsers (Chrome, Firefox, Safari, Edge)
  - Use feature detection for optional enhancements

### Input Validation Errors

**Problem**: Users enter invalid answers or interact unexpectedly
- **Detection**: Type checking, validation logic
- **Handling**: 
  - Validate all user input before processing
  - Provide clear error messages for invalid input
  - Prevent form submission with invalid data
  - Use input constraints (type="number", min/max attributes)

## Testing Strategy

### Testing Approach

The math-game application will use a **dual testing approach** combining unit tests and property-based tests:

- **Unit tests**: Verify specific examples, edge cases, error conditions, and integration between components
- **Property-based tests**: Verify universal properties across all inputs through randomization

This combination ensures comprehensive coverage: unit tests catch concrete bugs and validate specific behaviors, while property tests verify general correctness across a wide input space.

### Property-Based Testing Configuration

**Framework**: We will use **fast-check** for JavaScript property-based testing

**Configuration**:
- Each property test MUST run a minimum of 100 iterations
- Each test MUST include a comment tag referencing its design property
- Tag format: `// Feature: math-game, Property {number}: {property_text}`

**Generators Required**:
- File path generators for testing file structure validation
- HTML content generators with various link/script references
- File name generators with various character combinations
- Navigation path generators

### Unit Testing Strategy

**Framework**: Jest or Vitest for JavaScript unit testing

**Focus Areas**:

1. **File Structure Tests** (Examples)
   - Test that index.html exists at root
   - Test that data/ directory exists
   - Test that all seven game mode files exist
   - Test that CSS and JS directories have correct structure

2. **HTML Parsing Tests** (Examples)
   - Test that welcome page includes main.css reference
   - Test that menu includes main.js reference
   - Test that game modes include their specific CSS/JS files
   - Test that menu has seven selectable mode options

3. **Navigation Tests** (Examples)
   - Test that welcome page has link to main menu
   - Test that each menu option links to correct game mode file
   - Test that relative paths are correctly formed

4. **Naming Convention Tests** (Specific Examples)
   - Test that "menu-utama.html" follows hyphenated lowercase pattern
   - Test that "1-multiplication.html" uses correct numbering
   - Test edge case: reject "Menu-Utama.html" (has uppercase)
   - Test edge case: reject "1_multiplication.html" (has underscore)

5. **JavaScript Function Tests** (Examples)
   - Test that main.js exports playSound function
   - Test that main.js exports transitionTo function
   - Test that sound effect functions handle missing audio files gracefully

6. **Integration Tests** (Examples)
   - Test that clicking menu option triggers transition animation
   - Test that sound effects play on user interactions
   - Test complete navigation flow from welcome to game mode

### Property-Based Testing Strategy

**Property Test Suite**:

1. **Property 1: File Structure Validation**
   ```javascript
   // Feature: math-game, Property 1: Complete File Structure Validation
   // Generate random valid/invalid file structures and verify
   // that only the exact expected structure passes validation
   ```

2. **Property 2: HTML-CSS Dependencies**
   ```javascript
   // Feature: math-game, Property 2: Game Mode HTML-CSS Dependency
   // For any game mode number (1-7), verify the HTML file
   // references the CSS file with matching number
   ```

3. **Property 3: HTML-JS Dependencies**
   ```javascript
   // Feature: math-game, Property 3: Game Mode HTML-JS Dependency
   // For any game mode number (1-7), verify the HTML file
   // references the JS file with matching number
   ```

4. **Property 4: HTML Naming Convention**
   ```javascript
   // Feature: math-game, Property 4: HTML File Naming Convention
   // For any HTML file path, verify it uses only lowercase,
   // hyphens, and numbers
   ```

5. **Property 5: Game Mode Numbering**
   ```javascript
   // Feature: math-game, Property 5: Game Mode File Numbering
   // For any game mode, verify HTML, CSS, and JS files
   // all use the same numbered prefix (1-7)
   ```

6. **Property 6: English-Only Names**
   ```javascript
   // Feature: math-game, Property 6: English-Only File Names
   // For any file name, verify it contains only ASCII characters
   ```

7. **Property 7: Menu Navigation**
   ```javascript
   // Feature: math-game, Property 7: Main Menu Navigation Links
   // For any mode number (1-7), verify the menu link
   // points to the correct game mode file
   ```

8. **Property 8: Shared Dependencies**
   ```javascript
   // Feature: math-game, Property 8: Shared Dependency Inclusion
   // For any HTML file, verify it includes both main.css
   // and main.js references
   ```

### Test Organization

```
tests/
├── unit/
│   ├── file-structure.test.js
│   ├── html-parsing.test.js
│   ├── navigation.test.js
│   ├── naming-conventions.test.js
│   └── shared-functionality.test.js
└── property/
    ├── structure-properties.test.js
    ├── dependency-properties.test.js
    ├── naming-properties.test.js
    └── navigation-properties.test.js
```

### Testing Priorities

**High Priority** (Must test):
1. File structure validation (all files exist in correct locations)
2. HTML dependency correctness (CSS/JS references)
3. Navigation path correctness (links point to valid files)
4. Naming conventions (all files follow standards)

**Medium Priority** (Should test):
5. Shared functionality accessibility (main.js functions available)
6. Error handling (graceful degradation when resources missing)
7. Browser compatibility (works across major browsers)

**Low Priority** (Nice to have):
8. Performance testing (page load times)
9. Accessibility testing (screen reader compatibility)
10. Visual regression testing (UI appearance)

### Continuous Testing

- Run unit tests on every code change
- Run property tests before commits
- Validate file structure in CI/CD pipeline
- Test navigation paths after any structure changes
- Perform browser testing before releases

