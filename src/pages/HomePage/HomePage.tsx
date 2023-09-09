import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { BannerSlider } from '../../components/BannerSlider';
import { Categories } from '../../components/Categories';
import { CardSlider } from '../../components/CardSlider';
import { getDiscountProducts, getNewBrandProducts } from '../../api/products';
import { Product } from '../../types/product';

export const HomePage: React.FC = () => {
  const [newBrandProducts, setNewBrandProducts] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);

  useEffect(() => {
    getNewBrandProducts()
      .then((response) => setNewBrandProducts(response.data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    getDiscountProducts()
      .then((response) => setDiscountProducts(response.data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <div className="home-page">
      <h1 className="home-page__title">Welcome to Nice Gadgets store!</h1>

      <section className="home-page__slider">
        <BannerSlider />
      </section>

      <section className="home-page__new">
        <CardSlider models={newBrandProducts} title={'Brand new models'} />
      </section>

      <section className="home-page__category">
        <h3 className="home-page__category-title">Shop by category</h3>
        <Categories />
      </section>

      <section className="home-page__hot">
        <CardSlider models={discountProducts} title={'Hot prices'} />
      </section>
    </div>
  );
};
