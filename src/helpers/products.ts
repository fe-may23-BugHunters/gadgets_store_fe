import { Product } from '../types/product';

export function hasDiscountPrice({
  priceRegular,
  priceDiscount,
}: {
  priceRegular: number;
  priceDiscount: number;
}) {
  return priceDiscount || priceRegular - priceDiscount > 0;
}

export function getNormalizedTechSpecs(product: Product) {
  return [
    {
      title: 'Screen',
      value: product?.screen,
    },
    {
      title: 'Resolution',
      value: product?.resolution,
    },
    {
      title: 'Processor',
      value: product?.processor,
    },
    {
      title: 'RAM',
      value: product?.ram,
    },
    {
      title: 'Camera',
      value: product?.camera,
    },
    {
      title: 'Zoom',
      value: product?.zoom,
    },
    {
      title: 'Cell',
      value: product?.cell,
    },
  ].filter(({ value }) => value);
}

export function getCurrentTime() {
  const months = [
    'Jan',
    'Feb',
    'March',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date();
  const day = addZero(date.getDate());
  const month = months[date.getMonth()];
  const year = addZero(date.getFullYear());
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());
  const seconds = addZero(date.getSeconds());

  const currentDate
    = `${day} ${month} ${year}` + ` ${hours}:${minutes}:${seconds}`;

  return currentDate;
}

function addZero(number: number): string {
  if (number < 10) {
    return `0${number}`;
  }

  return number.toString();
}

export function normalizeColorName(color: string) {
  return color.replace(/[\W-_]+/gi, '');
}
