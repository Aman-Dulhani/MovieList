# MovieList App

A React application to browse movies with infinite scroll, genre filtering, and detailed movie information.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Future Developments](#futureDevelopments)

## Introduction

This application allows users to browse through a list of movies with features like infinite scrolling, genre-based filtering, global search for movie and viewing detailed movie information in a dialog.

## Features

- **Infinite Scrolling**: Load more movies as the user scrolls down or up depend on the props passed to the component.
- **Genre Filtering**: Filter movies by selected genre.
- **Movie Details Dialog**: View detailed information about a movie in a dialog.
- **Zoom on Hover**: Movie cards zoom in on hover.
- **Search**: We can search for any movie using search bar at the top.

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/Aman-Dulhani/MovieList.git
cd MovieList
npm install
npm run dev
```

Dev server will start on localhost:3000. We can change that in configuration.

## Future Developments

- **Virtualised Infinite Scrolling**: We can set a virtualised window for the infinite scrolling that would not overload the DOM by populating more and more movies as the user scrolls down or up.
- **API Calls Improvements**: We can make improvements on API calls as, while searching for a movie we can cancel all the previous call and make search only for the current call that is ongoing.
