# Chess Grandmasters Wiki Exercise

This project is a **Chess Grandmasters Wiki** built as a front-end exercise. It displays a paginated list of chess grandmasters, allows you to view detailed profiles, and demonstrates modern React best practices.

The folder structure is based on the [Bulletproof React](https://github.com/alan2207/bulletproof-react) architecture for scalable and maintainable applications.

## Features

- Paginated list of chess grandmasters
- Search and view detailed player profiles
- Live "last online" clock for each player
- Country flag and player info display
- Responsive and user-friendly UI

## Tech Stack

- React (with hooks)
- TypeScript
- React Router
- SCSS Modules

## Getting Started

1. **Install dependencies:**
    ```
    npm install
    ```
2. **Run the development server:**
    ```
    npm start
    ```
3. **Open the app:**
    - [http://localhost:3000](http://localhost:3000)

## Output

Below is a sample screenshot of the application:
![1](https://github.com/user-attachments/assets/c082fcec-4e54-4ce9-b8bc-ff8cfe069e61)

![2](https://github.com/user-attachments/assets/db8dc90f-9657-48bc-bd6e-ee4d38decd57)


## Project Structure

- `src/features/Grandmasters/components/GrandmastersList.tsx` — Main list and pagination
- `src/features/Grandmasters/components/GrandmasterProfile.tsx` — Player profile details
- `src/features/Grandmasters/api/` — API calls and types

## Notes

- This project is for educational and technical assessment purposes.
- Data is fetched from the [Chess.com public API](https://www.chess.com/news/view/published-data-api).
