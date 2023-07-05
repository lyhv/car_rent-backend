// eslint-disable-next-line @typescript-eslint/no-var-requires
const faker = require('faker');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

function dummyCars() {
  const dummyCars = [];
  const carTypes = [
    { id: 1, type: 'support' },
    { id: 2, type: 'suv' },
    { id: 3, type: 'mpv' },
    { id: 4, type: 'sedan' },
    { id: 5, type: 'coupe' },
    { id: 6, type: 'hatchback' },
  ];
  for (let i = 0; i < 100; i++) {
    const carType = faker.random.arrayElement(carTypes);
    const carRecord = {
      car_type_id: carType.id,
      created_by_user_id: 1,
      capacity: faker.random.number({ min: 2, max: 7 }),
      steering: faker.random.arrayElement(['Power', 'Manual']),
      gasoline: faker.random.number({ min: 0, max: 100 }),
      name: faker.vehicle.vehicle(),
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.date.past(10).getFullYear(),
      available: faker.random.boolean(),
      created_at: faker.date.recent(),
      updated_at: faker.date.recent(),
    };
    dummyCars.push(carRecord);
  }
  return dummyCars;
}

function dummyLocations() {
  const locations = [];
  for (let i = 0; i < 1000; i++) {
    const location = {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      postal_code: faker.address.zipCode(),
    };
    locations.push(location);
  }
  return locations;
}

async function generateCarImages() {
  const carImages = [];
  for (let i = 1; i <= 400; i++) {
    const carImage = {
      car_id: faker.random.number({ min: 1, max: 100 }),
      image_url: await getRandomCarImageUrl(),
    };
    carImages.push(carImage);
  }
  return carImages;
}

async function getRandomCarImageUrl() {
  try {
    const response = await axios.get(
      'https://source.unsplash.com/featured/?car',
    );
    return response.request.res.responseUrl;
  } catch (error) {
    console.error('Error fetching car image:', error);
    return null;
  }
}

function dummyCarPrices() {
  const carPrices = [];

  for (let i = 1; i <= 100; i++) {
    const carPrice = {
      car_id: i,
      price_per_day: faker.random.number({ min: 50, max: 1000 }),
      effective_date: faker.date.past(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    carPrices.push(carPrice);
  }
  for (let i = 1; i <= 100; i++) {
    const carPrice = {
      car_id: faker.random.number({ min: 1, max: 100 }),
      price_per_day: faker.random.number({ min: 50, max: 1000 }),
      effective_date: faker.date.past(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    carPrices.push(carPrice);
  }
  return carPrices;
}
// Generate dummy billing_infos data
const generateDummyBillingInfos = () => {
  const billingInfos = [];

  for (let i = 1; i <= 100; i++) {
    const billingInfo = {
      user_id: i,
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      postal_code: faker.address.zipCode(),
    };
    billingInfos.push(billingInfo);
  }

  return billingInfos;
};
module.exports = {
  dummyCars,
  dummyLocations,
  generateCarImages,
  dummyCarPrices,
  generateDummyBillingInfos,
};
