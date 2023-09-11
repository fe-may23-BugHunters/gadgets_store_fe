import React, { useState, useEffect } from 'react';
import './TabletsPage.scss';
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

export const TabletsPage: React.FC = () => {
  const { pathname, onPathChange } = usePathname();

  const [tablets, setTablets] = useState<Product[]>([]);
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
      Categories.TABLETS,
      sortBy,
    )
      .then((response) => {
        setTablets(response.data.rows);
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
    <article className="tablets">
      <div className="tablets__breadCrumbs">
        <BreadCrumbs pathname={pathname} onPathChange={onPathChange} />
      </div>

      <Loader isLoading={isLoading}>
        <EmptyComponent
          data={tablets}
          title={'There are no tablets yet...'}
          icon={EmptyImg}
          btnText={'Back to home'}
        >
          <div className="tablets__header">
            <h2 className="tablets__title">Tablets</h2>
            <p className="tablets__model">{total} models</p>
            {tablets.length > 0 && (
              <>
                <div className="tablets__select__block">
                  <div className="tablets__select__item">
                    <SelectBlock
                      selectName="Sort by"
                      value={sortBy}
                      options={sortByOptions}
                      onChangeSortBy={onSortChange}
                    />
                  </div>

                  <div className="tablets__select__item">
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

          <div className="tablets__cards">
            {tablets.map((tablet) => (
              <div className="tablets__card" key={tablet.id}>
                <CardItem product={tablet} />
              </div>
            ))}
          </div>

          <div className="tablets__pagination">
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
