# Les Petits Plats (Front-end-EN-P11-Search-Engine)

A web application for searching recipes, ingredients, devices, and utensils.

Project 7 of the OpenClassrooms Javascript Developer with reacht course

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/les-petits-plats.git
    cd les-petits-plats
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Development

To start the development server:

1. **Run the start script:**

    ```bash
    npm start
    ```

2. **Open your browser and navigate to:**

    ```
    http://localhost:9000
    ```

The development server will automatically reload your changes as you edit the source files.

## Building for Production

To create a production build of the project:

1. **Run the build script:**

    ```bash
    npm run build
    ```

2. **The optimized files will be in the `dist` folder.**

## File Structure

- `src/`: Contains the source code
- `dist/`: Contains the production build
- `css/`: Contains custom stylesheets
- `assets/`: Contains images, fonts, and other static assets

## Custom Styles

To add custom styles, update the `css/styles.css` file.

## Using FontAwesome

FontAwesome icons are included via the CDN in the HTML file. To use an icon, add the relevant class to an HTML element:

```html
<i class="fa-regular fa-circle-xmark"></i>
