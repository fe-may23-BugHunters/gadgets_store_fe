import React from 'react';
import './TechSpecsRow.scss';
import { TechSpecs } from '../../types/product';

interface Props {
  techSpec: TechSpecs;
}

export const TechSpecsRow: React.FC<Props> = ({ techSpec }) => {
  return (
    <li className="techSpecsRow__item">
      <span className="techSpecsRow__param">{techSpec.title}</span>
      <span className="techSpecsRow__value">
        {Array.isArray(techSpec.value)
          ? techSpec.value.join(', ')
          : techSpec.value}
      </span>
    </li>
  );
};
