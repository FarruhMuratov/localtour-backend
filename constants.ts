import { Tour, Partner, Booking } from './types';
import { 
    HISTORIC_DOWNTOWN_SVG_BASE64,
    MOUNTAIN_HIKE_SVG_BASE64,
    GOURMET_FOOD_SVG_BASE64,
    KAYAKING_ADVENTURE_SVG_BASE64,
    ZIPLINING_SVG_BASE64,
    CITY_PARK_PICNIC_SVG_BASE64
} from './assets/images';

export const USD_TO_UZS_RATE = 12650;

// Helper to generate some dates for the next month
const getNextMonthDates = (): string[] => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 7; i < 30; i += Math.floor(Math.random() * 5) + 3) {
        const nextDate = new Date(today.getTime());
        nextDate.setDate(today.getDate() + i);
        dates.push(nextDate.toISOString().split('T')[0]);
    }
    return dates;
};

export const INITIAL_PARTNERS: Partner[] = [
  { id: 'p1', name: 'City Adventures Inc.', status: 'Active' },
  { id: 'p2', name: 'Mountain Treks', status: 'Active' },
  { id: 'p3', name: 'Taste of the Town', status: 'Active' },
  { id: 'p4', name: 'Coastal Explorers', status: 'Active' },
  { id: 'p5', name: 'Adrenaline Junkies', status: 'Blocked' },
  { id: 'p6', name: 'Fun Times Co.', status: 'Active' },
];

export const INITIAL_TOURS: Tour[] = [
  {
    id: '1',
    partnerId: 'p1',
    partnerName: 'City Adventures Inc.',
    title: {
      en: 'Historic Downtown Walking Tour',
      ru: 'Историческая пешеходная экскурсия по центру города'
    },
    description: {
      en: 'Explore the rich history of our city, from its founding to the present day. A gentle 2-hour walk through the most iconic streets and landmarks.',
      ru: 'Исследуйте богатую историю нашего города, от его основания до наших дней. Неспешная 2-часовая прогулка по самым знаковым улицам и достопримечательностям.'
    },
    location: 'Springfield',
    price: 570000,
    durationDays: 1,
    imageUrl: HISTORIC_DOWNTOWN_SVG_BASE64,
    difficulty: 'Easy',
    type: 'Walking',
    rating: 4.8,
    availableDates: getNextMonthDates(),
    isFeatured: false,
  },
  {
    id: '2',
    partnerId: 'p2',
    partnerName: 'Mountain Treks',
    title: {
        en: 'Sunrise Mountain Hike',
        ru: 'Восход в горах'
    },
    description: {
        en: 'An unforgettable early morning hike to the summit of Mount Veridian to witness a breathtaking sunrise. Challenging but rewarding. Includes coffee and breakfast.',
        ru: 'Незабываемый ранний утренний поход на вершину горы Веридиан, чтобы увидеть захватывающий восход солнца. Сложно, но оно того стоит. Включает кофе и завтрак.'
    },
    location: 'Mount Veridian',
    price: 1200000,
    durationDays: 2,
    imageUrl: MOUNTAIN_HIKE_SVG_BASE64,
    difficulty: 'Challenging',
    type: 'Hiking',
    rating: 4.9,
    availableDates: getNextMonthDates(),
    isFeatured: true,
  },
  {
    id: '3',
    partnerId: 'p3',
    partnerName: 'Taste of the Town',
    title: {
        en: 'Gourmet Food & Wine Experience',
        ru: 'Гастрономический тур с вином'
    },
    description: {
        en: 'Indulge your senses with a curated tour of the best local eateries and wineries. Sample artisanal cheeses, craft beers, and award-winning wines.',
        ru: 'Побалуйте свои чувства эксклюзивным туром по лучшим местным закусочным и винодельням. Попробуйте ремесленные сыры, крафтовое пиво и вина, отмеченные наградами.'
    },
    location: 'Vine Valley',
    price: 1900000,
    durationDays: 1,
    imageUrl: GOURMET_FOOD_SVG_BASE64,
    difficulty: 'Easy',
    type: 'Food',
    rating: 4.7,
    availableDates: getNextMonthDates(),
    isFeatured: true,
  },
  {
    id: '4',
    partnerId: 'p4',
    partnerName: 'Coastal Explorers',
    title: {
        en: 'Coastal Kayaking Adventure',
        ru: 'Прибрежное приключение на каяках'
    },
    description: {
        en: 'Paddle along the stunning coastline, explore hidden caves, and get up close with marine wildlife. No experience necessary, all equipment provided.',
        ru: 'Плывите вдоль потрясающего побережья, исследуйте скрытые пещеры и познакомьтесь поближе с морской фауной. Опыт не требуется, все снаряжение предоставляется.'
    },
    location: 'Seacliff Bay',
    price: 1010000,
    durationDays: 3,
    imageUrl: KAYAKING_ADVENTURE_SVG_BASE64,
    difficulty: 'Moderate',
    type: 'Kayaking',
    rating: 4.8,
    availableDates: getNextMonthDates(),
    isFeatured: false,
  },
  {
    id: '5',
    partnerId: 'p5',
    partnerName: 'Adrenaline Junkies',
    title: {
        en: 'Extreme Ziplining',
        ru: 'Экстремальный зиплайн'
    },
    description: {
        en: 'Soar through the forest canopy on a series of thrilling ziplines. A high-speed adventure for the brave!',
        ru: 'Пролетите сквозь лесной полог на серии захватывающих зиплайнов. Высокоскоростное приключение для смелых!'
    },
    location: 'Redwood National Park',
    price: 1520000,
    durationDays: 1,
    imageUrl: ZIPLINING_SVG_BASE64,
    difficulty: 'Challenging',
    type: 'Adventure',
    rating: 5.0,
    availableDates: getNextMonthDates(),
    isFeatured: false,
  },
  {
    id: '6',
    partnerId: 'p6',
    partnerName: 'Fun Times Co.',
    title: {
        en: 'City Park Picnic & Games',
        ru: 'Пикник и игры в городском парке'
    },
    description: {
        en: 'A relaxing day at the city\'s largest park. We provide a delicious picnic basket and organize fun games for all ages. Perfect for families!',
        ru: 'Расслабляющий день в самом большом парке города. Мы предоставляем вкусную корзину для пикника и организуем веселые игры для всех возрастов. Идеально для семей!'
    },
    location: 'Springfield',
    price: 950000,
    durationDays: 1,
    imageUrl: CITY_PARK_PICNIC_SVG_BASE64,
    difficulty: 'Easy',
    type: 'Family',
    rating: 4.6,
    availableDates: getNextMonthDates(),
    isFeatured: false,
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    tourId: '1',
    bookingDate: '2024-07-15',
    status: 'Completed',
    review: {
      rating: 5,
      text: 'Amazing historical tour! Our guide was very knowledgeable and friendly. Highly recommended for anyone visiting Springfield.',
      photos: [],
    }
  },
  {
    id: 'b2',
    tourId: '2',
    bookingDate: '2024-06-20',
    status: 'Completed',
  },
  {
    id: 'b3',
    tourId: '4',
    bookingDate: '2024-09-25',
    status: 'Upcoming',
  }
];