/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you require will output into a single css file (app.css in this case)
const $ = require('jquery');
require('bootstrap');

/**
 * SCSS
 */
// require('../css/app.css');
require('../css/global.scss');
require('../css/games.scss');
// require('../css/header.scss');

/**
 * JAVASCRIPT
 */
require('./games/game_selector');
