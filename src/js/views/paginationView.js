import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curentPage === 1 && numPages > 1) {
      return `
      
      <button data-goto="${
        curentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>PAGE ${curentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }

    if (curentPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curentPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>PAGE ${curentPage - 1}</span>
    </button>
      `;
    }

    if (curentPage < numPages) {
      return `
        <button data-goto="${
          curentPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>PAGE ${curentPage - 1}</span>
      </button>
      <button data-goto="${
        curentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>PAGE ${curentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
        `;
    }

    return '';
  }
}

export default new PaginationView();
