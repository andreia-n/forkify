import icons from 'url:../../img/icons.svg';
import View from './View';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _messageError = 'No recipes found for your search!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
