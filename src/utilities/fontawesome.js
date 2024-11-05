// lib/fontawesome.js
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far); 

// Prevent Font Awesome from adding its CSS automatically
config.autoAddCss = false;

