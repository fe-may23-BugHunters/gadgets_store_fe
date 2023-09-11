import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './ProductItem.scss';

import { BtnBack } from '../../components/BtnBack';
import { ProductTechSpecs } from '../../components/ProductTechSpecs';
import { ProductAbout } from '../../components/ProductAbout';
import { ProductVariants } from '../../components/ProductVariants';
import { ProductPhotos } from '../../components/ProductPhotos';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { CardSlider } from '../../components/CardSlider';
import { usePathname } from '../../hooks/usePathname';

import {
  getProductById,
  getProductByOptions,
  getRecommendedProducts,
} from '../../api/products';
import { Product, VariantOptions } from '../../types/product';
import { getNormalizedTechSpecs } from '../../helpers/products';
import { EmptyComponent } from '../../components/EmptyComponent';
import { Loader } from '../../components/Loader';
import EmptyImg from '../../assets/icons/emptyList.png';

export const ProductItem: React.FC = () => {
  const { pathname, onPathChange } = usePathname();
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);

  const { itemId } = useParams();
  const navigate = useNavigate();

  const changeVariant = ({ color, capacity }: VariantOptions) => {
    getProductByOptions({
      color,
      capacity,
      namespaceId: product?.namespaceId as string,
    })
      .then((productFromServer) => {
        const page = pathname.split('/')[1];

        navigate(`/${page}/${productFromServer.data[0].id}`);
      })
      .catch(() => {
        throw new Error('Product by options not found');
      });
  };

  useEffect(() => {
    setIsLoadingProduct(true);

    getProductById(itemId as string)
      .then((dataFromServer) => {
        setProduct(dataFromServer.data);
      })
      .catch(() => {
        throw new Error('Product by id is not found');
      })
      .finally(() => setIsLoadingProduct(false));
  }, [itemId]);

  useEffect(() => {
    setIsLoadingRecommended(true);

    getRecommendedProducts()
      .then((response) => setRecommendedProducts(response.data))
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => setIsLoadingRecommended(false));
  }, [itemId]);

  if (isLoadingProduct) {
    return <Loader isLoading={isLoadingProduct} />;
  }

  if (!product) {
    return (
      <div className="noProduct">
        <EmptyComponent
          // data={product}
          data={null}
          title={'Cannot get product...'}
          icon={EmptyImg}
          btnText={'Back to home'}
        />
      </div>
    );
  }

  const techSpecs = getNormalizedTechSpecs(product);

  return (
    <div className="product">
      <div className="product__breadCrumbs">
        <BreadCrumbs
          pathname={pathname}
          onPathChange={onPathChange}
          productTitle={product?.name}
        />
      </div>

      <div className="product__btnBack">
        <BtnBack />
      </div>

      <h1 className="product__title">{product.name}</h1>

      <div className="product__content">
        <div className="product__photos">
          <ProductPhotos photos={product?.images} />
        </div>

        <div className="product__variants">
          <ProductVariants
            setOptions={changeVariant}
            product={product}
            techSpecs={techSpecs.slice(0, 4)}
          />
        </div>

        <div className="product__about">
          <ProductAbout desciption={product.description} />
        </div>

        <div className="product__techSpecs">
          <ProductTechSpecs techSpecs={techSpecs} />
        </div>
      </div>

      <Loader isLoading={isLoadingRecommended}>
        <div className="product__recommended">
          <CardSlider
            models={recommendedProducts}
            title={'You may also like'}
          />
        </div>
      </Loader>
    </div>
  );
};
