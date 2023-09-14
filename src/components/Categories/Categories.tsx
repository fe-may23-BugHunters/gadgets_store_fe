import React from 'react';
import { NavLink } from 'react-router-dom';
import './Categories.scss';

export const Categories: React.FC = () => {
  return (
    <section className="categories">
      <div className="categories__products">
        <article className="categories__card">
          <NavLink to="/phones" className="categories__link">
            <img
              src={`${location.origin}/img/Category_phones.jpg`}
              alt="category_phones"
              className="categories__photo"
            />
          </NavLink>
          <h3 className="categories__title">Mobile phones</h3>
          <p className="categories__amount">95 models</p>
        </article>
        <article className="categories__card">
          <NavLink to="/tablets" className="categories__link">
            <img
              src={`${location.origin}/img/Category_tablets.jpg`}
              alt="category_phones"
              className="categories__photo"
            />
          </NavLink>
          <h3 className="categories__title">Tablets</h3>
          <p className="categories__amount">24 models</p>
        </article>

        <article className="categories__card">
          <NavLink to="/accessories" className="categories__link">
            <img
              src={`${location.origin}/img/Category_accessories.jpg`}
              alt="category_accessories"
              className="categories__photo"
            />
          </NavLink>
          <h3 className="categories__title">Accessories</h3>
          <p className="categories__amount">100 models</p>
        </article>
      </div>
    </section>
  );
};
