import './styles.css';
import { ContentLoader } from './modules/domManager.js';

const pageContainer = document.querySelector('.page-container');
const contentLoader = ContentLoader();
// contentLoader.loadPregamePage(pageContainer);
contentLoader.loadIngamePage(pageContainer);
