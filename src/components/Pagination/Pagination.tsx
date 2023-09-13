/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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

  const [alwaysVisiblePages, setAlwaysVisiblePages] = useState(1);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 450) {
        setAlwaysVisiblePages(5);
      } else {
        setAlwaysVisiblePages(1);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    handleWindowResize();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const pagesOnEachSide = Math.floor(alwaysVisiblePages / 2);

  let startVisiblePage = currentPage - pagesOnEachSide;
  let endVisiblePage = currentPage + pagesOnEachSide;

  if (startVisiblePage < 1) {
    startVisiblePage = 1;
    endVisiblePage = Math.min(totalPages, alwaysVisiblePages);
  }

  if (endVisiblePage > totalPages) {
    endVisiblePage = totalPages;
    startVisiblePage = Math.max(1, totalPages - alwaysVisiblePages + 1);
  }

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
      {startVisiblePage > 1 && (
        <>
          <button
            onClick={() => onPageClick(1)}
            className={cn('pagination__item', {
              selected: currentPage === 1,
            })}
          >
            1
          </button>
          {startVisiblePage > 2 && (
            <button
              className="pagination__item more"
              onClick={() => onPageClick(currentPage - 5)}
            >
              ...
            </button>
          )}
        </>
      )}
      {pages.slice(startVisiblePage - 1, endVisiblePage).map((page) => page)}
      {endVisiblePage < totalPages && (
        <>
          {endVisiblePage < totalPages - 1 && (
            <button
              className="pagination__item more"
              onClick={() => onPageClick(currentPage + 5)}
            >
              ...
            </button>
          )}
          <button
            onClick={() => onPageClick(totalPages)}
            className={cn('pagination__item', {
              selected: totalPages === currentPage,
            })}
          >
            {totalPages}
          </button>
        </>
      )}
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
