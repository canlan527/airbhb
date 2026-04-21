import { House } from '@prisma/client';

export function toLegacyHouse(house: House) {
  return {
    _id: house.id,
    id: house.legacyId || house.id,
    picture_url: house.coverUrl,
    picture_urls: house.imageUrls,
    verify_info: {
      messages: house.verifyMessage.split(' · '),
      text_color: '#767676'
    },
    name: house.title,
    price: house.price,
    price_format: `￥${house.price}`,
    star_rating: house.rating,
    star_rating_color: '#FF5A5F',
    reviews_count: house.reviewsCount,
    bottom_info: {
      content: house.tags[0] || '',
      content_color: '#008489'
    },
    lat: 23.12,
    lng: 113.26,
    houseContent: `${house.bedrooms}室 ${house.bathrooms}卫`,
    houseTags: house.tags.map((tag, index) => ({
      tagText: {
        text: tag,
        color: '#FF9645',
        background: { color: 'rgba(255,150,69,0.15)' }
      },
      tagCode: 100000 + index
    })),
    description: house.description,
    city: house.city,
    address: house.address
  };
}
