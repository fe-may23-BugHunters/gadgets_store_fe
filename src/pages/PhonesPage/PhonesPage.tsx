import React, { useState, useEffect } from 'react';
import './PhonesPage.scss';
import { SelectBlock } from '../../components/SelectBlock';
import { Pagination } from '../../components/Pagination';
import { CardItem } from '../../components/CardItem';
import { usePathname } from '../../hooks/usePathname';
import { useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Loader } from '../../components/Loader';
import { EmptyComponent } from '../../components/EmptyComponent';
import { getProductsByCategory } from '../../api/products';
import {
  Categories,
  Product,
  SortBy,
  sortByOptions,
} from '../../types/product';
import EmptyImg from '../../assets/icons/emptyList.png';

export const PhonesPage: React.FC = () => {
  const { pathname, onPathChange } = usePathname();
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const perPageFromURL = Number(searchParams.get('perPage')) || 4;
  const sortByFromURL = (searchParams.get('sortBy') as SortBy) || SortBy.NAME;

  const [perPage, setPerPage] = useState<number>(perPageFromURL);
  const [sortBy, setSortBy] = useState<SortBy>(sortByFromURL);
  const [currentPage, setCurrentPage] = useState(1);

  const perPageOptions = [
    { title: '4', value: 4 },
    { title: '8', value: 8 },
    { title: '16', value: 16 },
  ];

  function onItemsChange(option: number) {
    setPerPage(option);

    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set('perPage', option.toString());
    setSearchParams(updatedSearchParams);
  }

  function onSortChange(option: SortBy) {
    setSortBy(option);

    const updatedSearchParams = new URLSearchParams(searchParams.toString());

    updatedSearchParams.set('sortBy', option);
    setSearchParams(updatedSearchParams);
  }

  useEffect(() => {
    setIsLoading(true);

    getProductsByCategory(
      +perPage,
      +perPage * (currentPage - 1),
      Categories.PHONES,
      sortBy as SortBy,
    )
      .then((response) => {
        setPhones(response.data.rows);
        setTotal(response.data.count);
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => setIsLoading(false));
  }, [perPage, currentPage, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <article className="phones">
      <div className="phones__breadCrumbs">
        <BreadCrumbs pathname={pathname} onPathChange={onPathChange} />
      </div>

      <Loader isLoading={isLoading}>
        <EmptyComponent
          data={phones}
          title={'There are no phones yet...'}
          icon={EmptyImg}
          btnText={'Back to home'}
        >
          <div className="phones__header">
            <h2 className="phones__title">Phones</h2>

            <p className="phones__model">{total} models</p>

            {phones.length > 0 && (
              <>
                <div className="phones__select__block">
                  <div className="phones__select__item">
                    <SelectBlock
                      selectName="Sort by"
                      value={sortBy as SortBy}
                      options={sortByOptions}
                      onChangeSortBy={onSortChange}
                    />
                  </div>

                  <div className="phones__select__item">
                    <SelectBlock
                      selectName="Items on page"
                      value={perPage}
                      onChangePerPage={onItemsChange}
                      options={perPageOptions}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="phones__cards">
            {phones.map((phone) => (
              <div className="phones__card" key={phone.id}>
                <CardItem product={phone} />
              </div>
            ))}
          </div>

          <div className="phones__pagination">
            <Pagination
              total={total}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </EmptyComponent>
      </Loader>
    </article>
  );
};
