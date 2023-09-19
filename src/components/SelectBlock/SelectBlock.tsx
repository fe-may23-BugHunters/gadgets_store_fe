import React, { useState, useEffect, useRef } from 'react';
import './SelectBlock.scss';
import arrowDown from '../../assets/icons/arrowDown.svg';
import arrowUp from '../../assets/icons/arrowUp.svg';
import cn from 'classnames';
import { SortBy } from '../../types/product';

interface SortByOptions {
  title: string;
  value: SortBy | number;
}

type Props = {
  selectName: string;
  options: SortByOptions[];
  defaultValue?: string | number;
  value?: string | number | SortBy;
  onChangeSortBy?: (value: SortBy) => void;
  onChangePerPage?: (value: number) => void;
};

export const SelectBlock: React.FC<Props> = ({
  selectName,
  options,
  value,
  onChangeSortBy,
  onChangePerPage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectTitle = options.find((option) => option.value === value)?.title;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: number | SortBy) => {
    if (selectName === 'Sort by') {
      onChangeSortBy?.(option as SortBy);
    } else {
      onChangePerPage?.(option as number);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (clickEvent: MouseEvent) => {
    if (
      wrapperRef.current
      && !wrapperRef.current.contains(clickEvent.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="selectBlock">
      <h3 className="selectBlock__title">{selectName}</h3>

      <div className="selectBlock__wrapper" ref={wrapperRef}>
        <div
          className="selectBlock__content"
          tabIndex={0}
          onClick={toggleDropdown}
        >
          <div className="selectBlock__selected-option">{selectTitle}</div>

          <div className="selectBlock__img">
            <img
              className="selectBlock__icon"
              src={isOpen ? arrowUp : arrowDown}
              alt={isOpen ? 'arrowUp' : 'arrowDown'}
            />
          </div>
        </div>

        <ul className={cn('selectBlock__options', { active: isOpen })}>
          {options.map((option) => (
            <li
              key={option.title}
              className="selectBlock__option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
