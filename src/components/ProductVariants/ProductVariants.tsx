import React, { useMemo, useState, useEffect } from 'react';
import './ProductVariants.scss';
import cn from 'classnames';
import { TechSpecsRow } from '../TechSpecsRow';
import { WideBtn } from '../WideBtn';
import { LikeBtn } from '../LikeBtn';
import { Product, TechSpecs, VariantOptions } from '../../types/product';
import { hasDiscountPrice, normalizeColorName } from '../../helpers/products';

interface Props {
  setOptions: ({ color, capacity }: VariantOptions) => void;
  product: Product;
  techSpecs: TechSpecs[];
}

export const ProductVariants: React.FC<Props> = ({
  setOptions,
  product,
  techSpecs,
}) => {
  const { capacityAvailable, colorsAvailable, priceRegular, priceDiscount }
    = product;
  const [selectedColor, setSelectedColor] = useState<string>(product.color);
  const [selectedCapacity, setSelectedCapacity] = useState<string>(
    product.capacity,
  );

  const hasDiscount = useMemo(
    () => hasDiscountPrice({ priceDiscount, priceRegular }),
    [priceRegular],
  );

  useEffect(() => {
    if (
      selectedColor === product.color
      && selectedCapacity === product.capacity
    ) {
      return;
    }

    setOptions({
      color: selectedColor,
      capacity: selectedCapacity,
    });
  }, [selectedColor, selectedCapacity]);

  const sortedColors = React.useMemo(
    () => [...colorsAvailable].sort(),
    [product],
  );

  return (
    <section className="variants">
      <div className="variants__labels">
        <h2 className="variants__title">Available colors</h2>

        <span className="variants__productId">
          {`ID: ${product.id.slice(0, 6)}`}
        </span>
      </div>

      <div className="variants__wrapper">
        <ul className="variants__colorsList">
          {sortedColors.map((color) => (
            <li className="variants__colorsItem" key={color}>
              <button
                className={cn(
                  'variants__colorsBtn',
                  `variants__colorsBtn--${normalizeColorName(color)}`,
                  {
                    'variants__colorsBtn--active': color === selectedColor,
                  },
                )}
                onClick={() => setSelectedColor(color)}
              />
            </li>
          ))}
        </ul>

        <h2 className="variants__label">Select capacity</h2>

        <ul className="variants__memories">
          {capacityAvailable.map((capacity) => (
            <li className="variants__memoryItem" key={capacity}>
              <button
                className={cn('variants__memoryBtn', {
                  'variants__memoryBtn--active': capacity === selectedCapacity,
                })}
                onClick={() => setSelectedCapacity(capacity)}
              >
                {capacity}
              </button>
            </li>
          ))}
        </ul>

        <p className="variants__price">
          <span className="variants__currentPrice">
            {`$${hasDiscount ? priceDiscount : priceRegular}`}
          </span>

          {hasDiscount && (
            <span className="variants__oldPrice">{`$${priceRegular}`}</span>
          )}
        </p>

        <div className="variants__buttons">
          <div className="variants__wideBtn">
            <WideBtn
              product={product}
              mainTitle={'Add to cart'}
              secondaryTitle={'Added to cart'}
            />
          </div>

          <div className="variants__favouriteBtn">
            <LikeBtn product={product} />
          </div>
        </div>

        <ul className="variants__techSpecs">
          {techSpecs.map((techSpec) => (
            <React.Fragment key={techSpec.title}>
              <TechSpecsRow techSpec={techSpec} />
            </React.Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};
