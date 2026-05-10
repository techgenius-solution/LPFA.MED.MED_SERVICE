export const clinics = [
  {
    id: 1,
    name: "Синчон Северанс",
    englishName: "Severance Hospital",
    location: "Сеул, Южная Корея",
    address: "0-1 Yonsei-ro, Sinchon-dong, Seodaemun-gu",
    rating: 5,
    reviewCount: 5,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&h=280&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
    ],
    description: "Больница Северанс системы здравоохранения Университета Ёнсе — это одна из старейших и крупнейших университетских клиник в Южной Корее. Она является ведущим центром медицинских исследований и лечения в Восточной Азии. На сегодняшний день, больница обслуживает 3500 стационарных и 1000 000 амбулаторных больных в год.\n\nПервое медицинское учреждение западного направления в Корее было основано в 1885 году американским доктором-миссионером Аллененом Dr. Horace. N. Allen.\n\nПо основанию учреждение называлось «Квиресвон», затем его переименовали в «Чечунвон» — впоследствии медицинское учреждение превратилось в больницу «Северанс» и, наконец, сегодня — это Система Здравоохранения при университете «Ёнсе».\n\n«С любовью больной осободить человечество от болезней и страданий» — с таким девизом на протяжении 50 лет клиника несла службу людям. С другой, принимая через 65 лет самозаявления, клиника стала доступна для всей Восточной Азии, готовая внести свой вклад в глобальное развитие медицинского обслуживания.",
    directions: ["Акушерство", "Кардиология", "Неврология", "Онкология"],
    priceRange: "$1000 - $5000",
  },
  {
    id: 2,
    name: "Медицинский центр Самсунг",
    englishName: "Samsung Medical Center",
    location: "Сеул, Южная Корея",
    address: "81 Irwon-ro, Gangnam-gu, Seoul",
    rating: 5,
    reviewCount: 12,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=280&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
    ],
    description: "Медицинский центр Самсунг — один из ведущих медицинских учреждений Южной Кореи, основанный в 1994 году. Клиника специализируется на онкологии, кардиологии и нейрохирургии.",
    directions: ["Онкология", "Кардиология", "Нейрохирургия"],
    priceRange: "$1200 - $6000",
  },
  {
    id: 3,
    name: "Кангнам Северанс",
    englishName: "Gangnam Severance Hospital",
    location: "Сеул, Южная Корея",
    address: "211 Eonju-ro, Gangnam-gu, Seoul",
    rating: 4,
    reviewCount: 8,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=280&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop",
    ],
    description: "Кангнам Северанс — многопрофильная университетская больница, специализирующаяся на комплексных медицинских услугах.",
    directions: ["Гинекология", "Педиатрия", "Хирургия"],
    priceRange: "$900 - $4500",
  },
  {
    id: 4,
    name: "Оздоровительный Центр «Чаум»",
    englishName: "Chaum Life Center",
    location: "Сеул, Южная Корея",
    address: "442 Dosan-daero, Gangnam-gu, Seoul",
    rating: 5,
    reviewCount: 20,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=280&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
    ],
    description: "Оздоровительный центр Чаум — премиальный медицинский центр, специализирующийся на антивозрастных программах и общем оздоровлении.",
    directions: ["Check Up", "Антивозрастная медицина", "Красота"],
    priceRange: "$2000 - $10000",
  },
];

export const clinicDirections = [
  "Все направления",
  "Акушерство",
  "Андрология",
  "Аллергология",
  "Гастроэнтерология",
  "Гинекология",
  "Дерматология",
  "Кардиология",
  "Кардиохирургия",
  "Заболевания опорно-двигательной системы",
  "Маммология",
  "Неврология",
  "Нефрология",
  "Онкология",
  "Ортопедия",
  "Оториноларингология",
  "Офтальмология",
  "Педиатрия",
  "Пульмонология",
  "Проктология",
  "Реабилитация",
  "Ревматология",
  "Стоматология",
  "Трансплантология",
  "Урология",
  "Флебология",
  "Хирургия",
  "Эндокринология",
];

export const clinicPrices = {
  1: [
    {
      category: "Аллергология",
      items: [
        { name: "Рак груди", price: "$1000", nameRight: "Меланома", priceRight: "$1000" },
        { name: "Рак простаты", price: "$1500", nameRight: "Рак желудка", priceRight: "$1500" },
        { name: "Рак легких", price: "$2000", nameRight: "Рак поджелудочной железы", priceRight: "$2000" },
      ]
    },
    {
      category: "Check Up",
      items: [
        { name: "Рак груди", price: "$1000", nameRight: "Меланома", priceRight: "$1000" },
        { name: "Рак простаты", price: "$1500", nameRight: "Рак желудка", priceRight: "$1500" },
        { name: "Рак груди", price: "$1000", nameRight: "Меланома", priceRight: "$1000" },
        { name: "Рак простаты", price: "$1500", nameRight: "Рак желудка", priceRight: "$1500" },
        { name: "Рак легких", price: "$3000", nameRight: "Рак поджелудочной железы", priceRight: "$2000" },
      ]
    },
  ]
};

export const clinicDoctors = [
  { id: 1, name: "Sung Hoon Noh", specialty: "Oncologist", clinic: "Director of the Yonsei Cancer Center", subClinic: "Severance Hospital", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face" },
  { id: 2, name: "Sung Hoon Noh", specialty: "Oncologist", clinic: "Director of the Yonsei Cancer Center", subClinic: "Severance Hospital", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face" },
  { id: 3, name: "Sung Hoon Noh", specialty: "Oncologist", clinic: "Director of the Yonsei Cancer Center", subClinic: "Severance Hospital", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face" },
  { id: 4, name: "Sung Hoon Noh", specialty: "Oncologist", clinic: "Director of the Yonsei Cancer Center", subClinic: "Severance Hospital", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face" },
  { id: 5, name: "Sung Hoon Noh", specialty: "Oncologist", clinic: "Director of the Yonsei Cancer Center", subClinic: "Severance Hospital", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face" },
  { id: 6, name: "Sung Hoon Noh", specialty: "Oncologist", clinic: "Director of the Yonsei Cancer Center", subClinic: "Severance Hospital", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face" },
  { id: 7, name: "Sung Hoon Noh", specialty: "Oncologist", clinic: "Director of the Yonsei Cancer Center", subClinic: "Severance Hospital", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face" },
  { id: 8, name: "Sung Hoon Noh", specialty: "Oncologist", clinic: "Director of the Yonsei Cancer Center", subClinic: "Severance Hospital", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face" },
  { id: 9, name: "Sung Hoon Noh", specialty: "Oncologist", clinic: "Director of the Yonsei Cancer Center", subClinic: "Severance Hospital", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=120&h=120&fit=crop&crop=face" },
];

export const clinicReviews = [
  { id: 1, author: "Akmaral:", date: "17 май 2019", rating: 5, text: "Клиника очень фешенебельная и мед персонал профессиональный и внимательный. Роза и Асель проделали огромную работу до приезда, отвечали быстро и чётко на все мои вопросы, а Айгерим постоянно была рядом на протяжении всего пребывания" },
  { id: 2, author: "Akmaral:", date: "17 май 2019", rating: 5, text: "Клиника очень фешенебельная и мед персонал профессиональный и внимательный. Роза и Асель проделали огромную работу до приезда, отвечали быстро и чётко на все мои вопросы, а Айгерим постоянно была рядом на протяжении всего пребывания" },
  { id: 3, author: "Akmaral:", date: "17 май 2019", rating: 5, text: "Клиника очень фешенебельная и мед персонал профессиональный и внимательный. Роза и Асель проделали огромную работу до приезда, отвечали быстро и чётко на все мои вопросы, а Айгерим постоянно была рядом на протяжении всего пребывания" },
  { id: 4, author: "Akmaral:", date: "17 май 2019", rating: 5, text: "Клиника очень фешенебельная и мед персонал профессиональный и внимательный. Роза и Асель проделали огромную работу до приезда, отвечали быстро и чётко на все мои вопросы, а Айгерим постоянно была рядом на протяжении всего пребывания" },
];
