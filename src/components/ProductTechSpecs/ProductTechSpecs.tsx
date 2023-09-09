import React from 'react';
import './ProductTechSpecs.scss';
import { TechSpecsRow } from '../TechSpecsRow';
import { TechSpecs } from '../../types/product';

interface Props {
  techSpecs: TechSpecs[];
}

export const ProductTechSpecs: React.FC<Props> = ({ techSpecs }) => {
  return (
    <section className="techSpecs">
      <h2 className="techSpecs__title">Tech specs</h2>

      <ul className="techSpecs__list">
        {techSpecs.map(({ title, value }) => (
          <React.Fragment key={title}>
            <TechSpecsRow
              techSpec={{
                title,
                value,
              }}
            />
          </React.Fragment>
        ))}
      </ul>
    </section>
  );
};
