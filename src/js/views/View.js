import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const html = this._generateMarkup();
    if (!render) return html;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }
  update(data) {
    this._data = data;
    const newHTML = this._generateMarkup();
    //create a virtual dom
    const newDOM = document.createRange().createContextualFragment(newHTML);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curentElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curentElements[i];
      //updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //UPDATE CHANGED ATRIBUTE
      if (!newEl.isEqualNode(curEl)) {
        //update curent element atribute with the atributes of new element
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderSpinner() {
    const html = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }
  renderMessage(message = this._message) {
    const html = `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }
  renderError(message = this._messageError) {
    const html = `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }
}
