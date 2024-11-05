// lib/fontawesome.js
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Prevent Font Awesome from adding its CSS automatically
config.autoAddCss = false;

// Add the solid icon pack to the library
library.add(fas);
