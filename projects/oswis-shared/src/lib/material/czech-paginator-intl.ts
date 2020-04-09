import {MatPaginatorIntl} from '@angular/material/paginator';

const czechRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) {
    return `0 z ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} z ${length}`;
};

export function getCzechPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Položek na stránku:';
  paginatorIntl.nextPageLabel = 'Následující stránka';
  paginatorIntl.previousPageLabel = 'Předchozí stránka';
  paginatorIntl.getRangeLabel = czechRangeLabel;
  paginatorIntl.firstPageLabel = 'První stránka';
  paginatorIntl.lastPageLabel = 'Poslední stránka';

  return paginatorIntl;
}
