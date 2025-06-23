# Netflix GPT
Click on Sign up" and use any random email and a strong password (e.g., Test1234@) to access the project.

## Overview

Netflix GPT is a React application that integrates with the TMDB API to provide a movie browsing experience. The app features user authentication, a search functionality powered by GPT, and a responsive design using Tailwind CSS.

## Features

- Create a React app
- Configure Tailwind CSS
- Header component
- Login and Sign Up forms
- Form validation
- Use of useRef for form handling
- Firebase setup for authentication
- Deploying the app to production
- Create user accounts for sign-up
- Implement sign-in user API
- Created Redux store with user slice
- Implemented sign-out functionality
- Update user profile
- Bug Fixes:
  - Display name for sign-up users
  - Redirect to login page if the user is not logged in
- Unsubscribe from the onAuthStateChange listener
- Added hardcoded values to the constants file
- Registered for TMDB API and created an app to get an access token
- API calls to fetch data from TMDB
- Custom hooks for data fetching
- Created movie slice for Redux
- Planning for main and secondary containers
- Updated store with trailer video data
- Fetch data for trailer videos
- Embedded YouTube videos with autoplay
- Added Tailwind CSS for styling
- GPT search page and search bar
- Multi-language feature for GPT
- GPT search API integration
- Optimized performance
- Responsive design
- Deployed on GitHub Pages
- Handled DNS errors

## Application Structure

### Skeleton
├── Header
│   ├── Logo
│   ├── Navigation Bar
│   ├── Cart
│   ├── Authentication
│       ├── Login Form
│       │   ├── Email Input
│       │   ├── Password Input
│       │   ├── Submit Button
│       ├── Sign Up Form
│           ├── Name Input
│           ├── Email Input
│           ├── Password Input
│           ├── Submit Button
│
├── Browser
│   ├── Main Movie Section
│   │   ├── Background Movie Trailer
│   │   ├── Title
│   │   ├── Description
│   │   ├── Movie Suggestions
│   │   ├── Movie List
│   │   ├── Movie Card (Vertical Scroll)
│   │   ├── Movie Card (Vertical Scroll)
│   │   └── ...
│   ├── Main Video Container
│   │   ├── Video Background
│   │   ├── Title
│   │   └── Description
│   ├── Secondary Container
│       ├── Popular Movie List
│       │   ├── Movie Card
│       │   ├── Movie Card
│       │   └── ...
│       ├── Trending Movie List
│       │   ├── Movie Card
│       │   ├── Movie Card
│       │   └── ...
│       ├── Horror Movie List
│           ├── Movie Card
│           ├── Movie Card
│           └── ...
│
├── Search
│   ├── GPT Search Bar
│   ├── Search Results
│   ├── Movie Suggestions
│   ├── Movie Card
│   ├── Movie Card
│   └── ...
│
└── Footer (Coming Soon)
    ├── Links
    ├── Contact Information
    └── Social Media Links

- feel free to use
  npm run build
  npm run deploy
