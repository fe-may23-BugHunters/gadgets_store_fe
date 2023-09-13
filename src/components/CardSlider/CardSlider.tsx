import React, { useRef, useState, useEffect } from 'react';
import './CardSlider.scss';
import classNames from 'classnames';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrowLeft.svg';
// eslint-disable-next-line max-len
import { ReactComponent as ArrowRight } from '../../assets/icons/arrowRight.svg';
import { Product } from '../../types/product';
import { CardItem } from '../CardItem';
import { CardSkeleton } from '../skeletons/CardSkeleton';

interface Props {
  title: string;
  models: Product[];
  isLoading?: boolean;
}

export const CardSlider: React.FC<Props> = ({
  title,
  models,
  isLoading,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const setOrUpdateMaxScroll = () => {
      if (containerRef.current) {
        const scrollWidth = containerRef.current?.scrollWidth;
        const offsetWidth = containerRef.current?.offsetWidth;
        const maxScrollValue = scrollWidth - offsetWidth;

        setMaxScroll(maxScrollValue);
      }
    };

    setOrUpdateMaxScroll();
    window.addEventListener('resize', setOrUpdateMaxScroll);
  }, [models.length]);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const current = containerRef.current as HTMLDivElement;

      if (current.scrollLeft && current.offsetWidth) {
        current.scrollTo({
          left: current.scrollLeft - current.offsetWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const current = containerRef.current as HTMLDivElement;

      if (current.scrollLeft != null && current.offsetWidth) {
        current.scrollTo({
          left: current.scrollLeft + current.offsetWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(+containerRef.current?.scrollLeft);
    }
  };

  return (
    <div className="carouselContainer">
      <div className="carouselHeader">
        <h2 className="carouselHeader__title">{title}</h2>

        <div className="carouselHeader__arrows">
          <div
            className={classNames('carouselArrow', 'carouselArrow-left', {
              'carouselArrow__left--disabled': scrollPosition === 0,
            })}
            onClick={handleScrollLeft}
          >
            <ArrowLeft />
          </div>

          <div
            className={classNames('carouselArrow', 'carouselArrow-right', {
              'carouselArrow__right--disabled':
                maxScroll - scrollPosition <= 10,
            })}
            onClick={handleScrollRight}
          >
            <ArrowRight />
          </div>
        </div>
      </div>
      <div
        className="CarouselSliderContainer"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className="carouselSlider">
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <React.Fragment key={index}>
                  <div className="cardContainer">
                    <CardSkeleton />
                  </div>
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              {models.map((model) => (
                <div className="cardContainer" key={model.id}>
                  <CardItem product={model} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
