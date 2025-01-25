import './styles.css';
import { GameDOMManager } from './modules/domManager.js';
import { PregameController } from './modules/controller.js';

const domManager = GameDOMManager();
PregameController(domManager);
