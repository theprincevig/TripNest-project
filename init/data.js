// Import the Listing model if needed in future operations
// const Listing = require('../models/listing'); // (Optional if used in a seeding script)

// ==========================
// Demo / Seed Listing Data
// ==========================

const listingData = [
  {
    title: "Cozy Mountain Cabin",
    description: "Escape to this quiet cabin with breathtaking mountain views and a warm fireplace.",
    image: {
      filename: "listingimage",
      url: "https://hips.hearstapps.com/hmg-prod/images/cozy-winter-cabins-1603479244.jpg?crop=0.8788951349850787xw:1xh;center,top&resize=1200:*"
    },
    price: 1200,
    location: "Aspen, CO",
    country: "USA"
  },
  {
    title: "Modern Apartment in City Center",
    description: "A stylish apartment located in the heart of the city, perfect for business or leisure.",
    image: {
      filename: "listingimage",
      url: "https://www.tece.com/sites/default/files/styles/img_style_keyvisual_default_sm/public/media-images/main/2022-11/h-hotels_aussenansicht-02-h2-hotel-duesseldorf-city_L%20%28max.%203000px%29%20_700dfb55_KV.jpg?h=084e9069&itok=_7ZHfGYn"
    },
    price: 950,
    location: "Berlin",
    country: "Germany"
  },
  {
    title: "Beachfront Villa with Pool",
    description: "Luxury villa right on the beach with a private pool and panoramic ocean views.",
    image: {
      filename: "listingimage",
      url: "https://media.villagetaways.com/villas/thailand/874/dedcae8a955b6f489407068207c60c7b_full.jpg"
    },
    price: 2500,
    location: "Phuket",
    country: "Thailand"
  },
  {
    title: "Charming Countryside Cottage",
    description: "Enjoy the peaceful countryside in this classic English cottage surrounded by nature.",
    image: {
      filename: "listingimage",
      url: "https://www.thespruce.com/thmb/tuGdCqVQjabSpIOXD0foDGBCWe4=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/typical-cotswolds-stone-houses-in-lower-slaughter--670223809-48c0aac31e7e450e9fe1268576a04967.jpg"
    },
    price: 800,
    location: "Cotswolds",
    country: "UK"
  },
  {
    title: "Luxury High-Rise Studio",
    description: "Experience skyline views from the 35th floor of this sleek downtown studio.",
    image: {
      filename: "listingimage",
      url: "https://2fifteen.ca/wp-content/uploads/2022/05/2Fifteen-Penthouse-1.webp"
    },
    price: 1400,
    location: "Toronto",
    country: "Canada"
  },
  {
    title: "Rustic Farm Stay",
    description: "Get hands-on with nature at this peaceful farm stay with animals and fresh produce.",
    image: {
      filename: "listingimage",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/19294145.webp?k=1021830e471dc6cf15cd29908656ab1a1a34d9c8b9f031c1614420da214c4447&o="
    },
    price: 650,
    location: "Tuscany",
    country: "Italy"
  },
  {
    title: "Minimalist Zen Loft",
    description: "Relax in this calming, Japanese-inspired loft ideal for mindfulness and quiet stays.",
    image: {
      filename: "listingimage",
      url: "https://old-tokyo.info/wp-content/uploads/2017/08/inside-1200x713.jpg"
    },
    price: 1100,
    location: "Kyoto",
    country: "Japan"
  },
  {
    title: "Treehouse Adventure",
    description: "Live among the treetops in this fun, family-friendly treehouse surrounded by forest.",
    image: {
      filename: "listingimage",
      url: "https://cdn.outsideonline.com/wp-content/uploads/2025/01/TravelersRestSouthCarolina-featuredimg.jpg"
    },
    price: 1300,
    location: "Portland, OR",
    country: "USA"
  },
  {
    title: "Desert Dome Stay",
    description: "Stay under the stars in a geodesic dome in the heart of the desert landscape.",
    image: {
      filename: "listingimage",
      url: "https://fdomes.com/wp-content/uploads/2023/03/HoneyHiveCabin-2.jpeg"
    },
    price: 1450,
    location: "Joshua Tree, CA",
    country: "USA"
  },
  {
    title: "Canal House Retreat",
    description: "Charming canal-side home with bikes, garden, and easy access to city life.",
    image: {
      filename: "listingimage",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/318959381.jpg?k=051434af6467aacf8668897db6c6b081eea396fba11476bd94fa5fc636a98e09&o=&hp=1"
    },
    price: 1500,
    location: "Amsterdam",
    country: "Netherlands"
  },
  {
    title: "Historic Stone Villa",
    description: "Beautiful stone villa with antique decor and modern amenities in a quiet historic town.",
    image: {
      filename: "listingimage",
      url: "https://images.squarespace-cdn.com/content/v1/58487dc4b8a79b6d02499b60/1617996777808-KHXBYQPE73PI8OI4K79N/Francis+York+Stone+Bastide35.jpg"
    },
    price: 1700,
    location: "Avignon",
    country: "France"
  },
  {
    title: "Floating House on the Lake",
    description: "Unique floating house experience with 360° lake views and kayak access.",
    image: {
      filename: "listingimage",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/LakeUnionHouseboat.jpg/1200px-LakeUnionHouseboat.jpg"
    },
    price: 2000,
    location: "Queenstown",
    country: "New Zealand"
  },
  {
    title: "Colorful Artist Loft",
    description: "Creative space full of art and charm, ideal for painters and digital nomads.",
    image: {
      filename: "listingimage",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/301341610.jpg?k=06d056f8880f2e1cf19af6c5b1c6b86e66f885d4061d6483413890e6062ff286&o=&hp=1"
    },
    price: 900,
    location: "Barcelona",
    country: "Spain"
  },
  {
    title: "Modern Desert Cabin",
    description: "Stylish desert cabin with glass walls and a hot tub under the stars.",
    image: {
      filename: "listingimage",
      url: "https://images2.dwell.com/photos/6063391372700811264/6133452257581948928/original.jpg?ar=4:3&fit=crop"
    },
    price: 1600,
    location: "Sedona, AZ",
    country: "USA"
  },
  {
    title: "Skylight Urban Flat",
    description: "Bright flat with massive skylights, right next to cafes and shops.",
    image: {
      filename: "listingimage",
      url: "https://www.sustainableconstructionservices.com.au/wp-content/uploads/2022/02/Skylights.png"
    },
    price: 1000,
    location: "Melbourne",
    country: "Australia"
  },
  {
    title: "Icelandic Eco Lodge",
    description: "Sustainable lodge with geothermal heating and views of the Northern Lights.",
    image: {
      filename: "listingimage",
      url: "https://www.theluxevoyager.com/wp-content/uploads/2020/04/Deplar-Farm-Iceland-Northern-Lights-1.jpg"
    },
    price: 1900,
    location: "Reykjavik",
    country: "Iceland"
  },
  {
    title: "Secluded Jungle Bungalow",
    description: "Live off-grid in this eco-friendly jungle hideaway with hammock and outdoor shower.",
    image: {
      filename: "listingimage",
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/163511806.jpg?k=1f5d3320e848d8d97668ae7243fd1f2c4a6940c76b69b5279877d6f7ab5f26ab&o=&hp=1"
    },
    price: 750,
    location: "Ubud",
    country: "Indonesia"
  },
  {
    title: "Ski-In Chalet",
    description: "Cozy wooden chalet at the base of ski slopes, with sauna and fireplace.",
    image: {
      filename: "listingimage",
      url: "https://cdn.oxfordski.com/media/79026/chalet-evening-lit-up-looking-towards-ta-sch-resized.jpg?width=1240&height=698&mode=crop&scale=downscaleonly&quality=85"
    },
    price: 2200,
    location: "Zermatt",
    country: "Switzerland"
  },
  {
    title: "Bohemian Rooftop Studio",
    description: "Colorful rooftop retreat with boho decor and views over the city skyline.",
    image: {
      filename: "listingimage",
      url: "https://assets.eventflare.io/eventflare.io/5f656463dc0ac460e3ed3a45ab37e81f.webp"
    },
    price: 850,
    location: "Mexico City",
    country: "Mexico"
  },
  {
    title: "Tiny House Retreat",
    description: "Smartly designed tiny home with everything you need for a minimalist escape.",
    image: {
      filename: "listingimage",
      url: "https://livinginatiny.com/wp-content/uploads/2023/06/ad13e4144840889.6293deaa3c470.jpg"
    },
    price: 700,
    location: "Vancouver Island",
    country: "Canada"
  }
];

// Exporting listing data for use in other files (e.g., seed script)
module.exports = { data: listingData };