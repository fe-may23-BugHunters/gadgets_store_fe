/* eslint-disable max-len */
import React from 'react';
import './ProductAbout.scss';
import { DescriptionItem } from '../../types/product';

interface Props {
  desciption: DescriptionItem[];
}

export const ProductAbout: React.FC<Props> = ({ desciption }) => {
  return (
    <section className="about">
      <h2 className="about__title">About</h2>

      <ul className="about__list">
        {desciption.map((item) => (
          <article className="about__info-block" key={item.title}>
            <h3 className="about__info-title">{item.title}</h3>

            <div className="about__paragraphs">
              {item.text.map((paragraph) => (
                <p className="about__paragraphItem" key={paragraph.slice(0, 5)}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </ul>
    </section>
  );
};
