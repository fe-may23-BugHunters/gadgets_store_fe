/* eslint-disable max-len */
import React from 'react';
import './Pagination.scss';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrowLeft.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrowRight.svg';
import cn from 'classnames';
import { useScrollUp } from '../../hooks/useScrollUp';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (value: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const { handleScrollUp } = useScrollUp();

  const pages = [];

  for (let page = 1; page <= totalPages; page++) {
    pages.push(
      <button
        key={page}
        onClick={() => {
          onPageClick(page);
          handleScrollUp();
        }}
        className={cn('pagination__item', {
          selected: page === currentPage,
        })}
      >
        {page}
      </button>,
    );
  }

  const onPageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const onPrevClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const onNextClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={onPrevClick}
        className={cn('pagination__item-arrow', {
          'arrow-left--disabled': isFirstPage,
        })}
        disabled={isFirstPage}
      >
        <ArrowLeft />
      </button>
      {pages}
      <button
        onClick={onNextClick}
        className={cn('pagination__item-arrow', {
          'arrow-right--disabled': isLastPage,
        })}
        disabled={isLastPage}
      >
        <ArrowRight />
      </button>
    </div>
  );
};
