# Requirements Document

## Introduction

The Math Game is an interactive web-based educational application designed to help users practice mathematical skills through seven distinct game modes. The application provides a modular architecture where each game mode operates independently with its own interface, styling, and logic. Users can select from various mathematical operations including multiplication, addition, subtraction, division, and specialized challenge modes.

## Glossary

- **Application**: The complete math game web application system
- **User**: Any person interacting with the math game
- **Game_Mode**: A distinct mathematical challenge type with unique rules and interface
- **Welcome_Page**: The initial landing page (index.html) where users begin
- **Main_Menu**: The menu interface (menu-utama.html) displaying all game mode options
- **Mode_File**: The HTML file containing a specific game mode interface
- **Style_Module**: A CSS file providing styling for a specific component or mode
- **Logic_Module**: A JavaScript file containing game logic for a specific mode
- **Sound_Effect**: An audio feedback element played during user interactions
- **Transition**: A visual effect when navigating between pages or states

## Requirements

### Requirement 1: Project Structure

**User Story:** As a developer, I want a well-organized modular file structure, so that I can easily locate and maintain each game component.

#### Acceptance Criteria

1. THE Application SHALL contain an index.html file at the root level
2. THE Application SHALL contain a data/ directory at the root level
3. THE data/ directory SHALL contain three subdirectories: view/, css/, and js/
4. THE view/ directory SHALL contain menu-utama.html and an all-mode/ subdirectory
5. THE all-mode/ subdirectory SHALL contain exactly seven Mode_File files named: 1-multiplication.html, 2-addition.html, 3-subtraction.html, 4-division.html, 5-target.html, 6-middle-value.html, and 7-memory.html
6. THE css/ directory SHALL contain main.css and a mode-css/ subdirectory
7. THE mode-css/ subdirectory SHALL contain seven Style_Module files corresponding to each Game_Mode
8. THE js/ directory SHALL contain main.js and a logic/ subdirectory
9. THE logic/ subdirectory SHALL contain seven Logic_Module files corresponding to each Game_Mode

### Requirement 2: Welcome Page

**User Story:** As a user, I want a welcome page that introduces the game, so that I understand what the application offers before starting.

#### Acceptance Criteria

1. THE Welcome_Page SHALL serve as the entry point to the Application
2. THE Welcome_Page SHALL provide a mechanism to navigate to the Main_Menu
3. THE Welcome_Page SHALL use styling from main.css
4. THE Welcome_Page SHALL use functionality from main.js

### Requirement 3: Main Menu Navigation

**User Story:** As a user, I want a main menu that displays all available game modes, so that I can choose which mathematical skill to practice.

#### Acceptance Criteria

1. THE Main_Menu SHALL display seven selectable Game_Mode options
2. THE Main_Menu SHALL label the game modes as Mode 1 through Mode 7
3. WHEN a user selects a Game_Mode option, THE Main_Menu SHALL navigate to the corresponding Mode_File
4. THE Main_Menu SHALL use styling from main.css
5. THE Main_Menu SHALL use functionality from main.js for navigation Transition effects

### Requirement 4: Multiplication Mode

**User Story:** As a user, I want to practice multiplication problems, so that I can improve my multiplication skills.

#### Acceptance Criteria

1. THE Application SHALL provide a multiplication Game_Mode accessible via 1-multiplication.html
2. THE multiplication Game_Mode SHALL use styling from its corresponding Style_Module in mode-css/
3. THE multiplication Game_Mode SHALL use game logic from its corresponding Logic_Module in logic/
4. THE multiplication Game_Mode SHALL present multiplication problems to the User

### Requirement 5: Addition Mode

**User Story:** As a user, I want to practice addition problems, so that I can improve my addition skills.

#### Acceptance Criteria

1. THE Application SHALL provide an addition Game_Mode accessible via 2-addition.html
2. THE addition Game_Mode SHALL use styling from its corresponding Style_Module in mode-css/
3. THE addition Game_Mode SHALL use game logic from its corresponding Logic_Module in logic/
4. THE addition Game_Mode SHALL present addition problems to the User

### Requirement 6: Subtraction Mode

**User Story:** As a user, I want to practice subtraction problems, so that I can improve my subtraction skills.

#### Acceptance Criteria

1. THE Application SHALL provide a subtraction Game_Mode accessible via 3-subtraction.html
2. THE subtraction Game_Mode SHALL use styling from its corresponding Style_Module in mode-css/
3. THE subtraction Game_Mode SHALL use game logic from its corresponding Logic_Module in logic/
4. THE subtraction Game_Mode SHALL present subtraction problems to the User

### Requirement 7: Division Mode

**User Story:** As a user, I want to practice division problems, so that I can improve my division skills.

#### Acceptance Criteria

1. THE Application SHALL provide a division Game_Mode accessible via 4-division.html
2. THE division Game_Mode SHALL use styling from its corresponding Style_Module in mode-css/
3. THE division Game_Mode SHALL use game logic from its corresponding Logic_Module in logic/
4. THE division Game_Mode SHALL present division problems to the User

### Requirement 8: Target Mode

**User Story:** As a user, I want a target-based mathematical challenge, so that I can practice reaching specific numerical goals.

#### Acceptance Criteria

1. THE Application SHALL provide a target Game_Mode accessible via 5-target.html
2. THE target Game_Mode SHALL use styling from its corresponding Style_Module in mode-css/
3. THE target Game_Mode SHALL use game logic from its corresponding Logic_Module in logic/
4. THE target Game_Mode SHALL present target-based mathematical challenges to the User

### Requirement 9: Middle Value Mode

**User Story:** As a user, I want to practice finding middle values, so that I can improve my numerical reasoning skills.

#### Acceptance Criteria

1. THE Application SHALL provide a middle value Game_Mode accessible via 6-middle-value.html
2. THE middle value Game_Mode SHALL use styling from its corresponding Style_Module in mode-css/
3. THE middle value Game_Mode SHALL use game logic from its corresponding Logic_Module in logic/
4. THE middle value Game_Mode SHALL present middle value identification challenges to the User

### Requirement 10: Memory Mode

**User Story:** As a user, I want a memory-based mathematical game, so that I can improve both my memory and mathematical skills.

#### Acceptance Criteria

1. THE Application SHALL provide a memory Game_Mode accessible via 7-memory.html
2. THE memory Game_Mode SHALL use styling from its corresponding Style_Module in mode-css/
3. THE memory Game_Mode SHALL use game logic from its corresponding Logic_Module in logic/
4. THE memory Game_Mode SHALL present memory-based mathematical challenges to the User

### Requirement 11: Modular Architecture

**User Story:** As a developer, I want each game mode to be independent and modular, so that I can modify or extend individual modes without affecting others.

#### Acceptance Criteria

1. THE Application SHALL separate each Game_Mode into distinct HTML, CSS, and JavaScript files
2. WHEN a Logic_Module is modified, THE Application SHALL not require changes to other Logic_Module files
3. WHEN a Style_Module is modified, THE Application SHALL not require changes to other Style_Module files
4. THE Application SHALL use English naming conventions for all file names

### Requirement 12: Common Functionality

**User Story:** As a developer, I want shared functionality centralized in parent modules, so that I can maintain common features efficiently.

#### Acceptance Criteria

1. THE main.js file SHALL provide Sound_Effect functionality accessible to all Game_Mode modules
2. THE main.js file SHALL provide Transition functionality accessible to all Game_Mode modules
3. THE main.css file SHALL provide common styling for the Welcome_Page and Main_Menu
4. WHEN a Game_Mode requires common functionality, THE Logic_Module SHALL access it from main.js

### Requirement 13: File Naming Convention

**User Story:** As a developer, I want consistent English file names, so that the codebase is accessible to international developers.

#### Acceptance Criteria

1. THE Application SHALL use English words in all file names
2. THE Application SHALL use hyphenated lowercase naming for HTML files
3. THE Application SHALL use numbered prefixes for Game_Mode files in sequential order
4. THE Application SHALL use descriptive names that reflect the file's purpose
