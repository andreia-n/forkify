import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './View';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _messageError = 'No bookmarks yet. Find a recipe and bookmark!';
  _message = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
