import React, { useState, useEffect } from 'react';
import './PhonesPage.scss';
import { SelectBlock } from '../../components/SelectBlock';
import { Pagination } from '../../components/Pagination';
import { CardItem } from '../../components/CardItem';
import { usePathname } from '../../hooks/usePathname';
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
  const [perPage, setPerPage] = useState<string | number>(4);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const perPageOptions = [
    { title: '4', value: 4 },
    { title: '8', value: 8 },
    { title: '16', value: 16 },
  ];

  function onItemsChange(option: number) {
    setPerPage(option);
  }

  function onSortChange(option: SortBy) {
    setSortBy(option);
  }

  useEffect(() => {
    setIsLoading(true);

    getProductsByCategory(
      +perPage,
      +perPage * (currentPage - 1),
      Categories.PHONES,
      sortBy,
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
    <article className="accessories">
      <div className="accessories__breadCrumbs">
        <BreadCrumbs pathname={pathname} onPathChange={onPathChange} />
      </div>

      <Loader isLoading={isLoading}>
        <EmptyComponent
          // data={phones}
          data={null}
          title={'There are no phones yet...'}
          icon={EmptyImg}
          btnText={'Back to home'}
        >
          <div className="accessories__header">
            <h2 className="accessories__title">Phones</h2>

            <p className="accessories__model">{total} models</p>

            {phones.length > 0 && (
              <>
                <div className="accessories__select__block">
                  <div className="accessories__select__item">
                    <SelectBlock
                      selectName="Sort by"
                      value={sortBy}
                      options={sortByOptions}
                      onChangeSortBy={onSortChange}
                    />
                  </div>

                  <div className="accessories__select__item">
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

          <div className="accessories__cards">
            {phones.map((phone) => (
              <div className="accessories__card" key={phone.id}>
                <CardItem product={phone} />
              </div>
            ))}
          </div>

          <div className="accessories__pagination">
            <Pagination
              total={total}
              perPage={+perPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </EmptyComponent>
      </Loader>
    </article>
  );
};
