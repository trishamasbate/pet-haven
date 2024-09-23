const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Basic' },
    { name: 'Standard' },
    { name: 'Premium' },
    { name: 'Deluxe' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Basic Package',
      description:
        'Pamper your pet with our essential spa services, perfect for a quick refresh. This package includes a gentle shampoo bath, a thorough coat brushing, ear cleaning, and a nail trim. Your pet will leave feeling clean and rejuvenated.',
      image: 'basic.jpg',
      category: categories[0]._id,
      price: 20.00, // Updated to USD
      quantity: 20
    },
    {
      name: 'Basic Package',
      description:
        'Pamper your pet with our essential spa services, perfect for a quick refresh. This package includes a gentle shampoo bath, a thorough coat brushing, ear cleaning, and a nail trim. Your pet will leave feeling clean and rejuvenated.',
      image: 'basic.jpg',
      category: categories[0]._id,
      price: 20.00, // Updated to USD
      quantity: 10
    },
    {
      name: 'Standard Package',
      category: categories[1]._id,
      description:
        'Upgrade your pet’s spa experience with our Standard Package. Along with all the Basic services, your pet will enjoy a deep conditioning treatment to soften and detangle their coat, followed by a relaxing paw massage. This package also includes a spritz of our signature pet-safe fragrance.',
      image: 'standard.jpg',
      price: 40.00, // Updated to USD
      quantity: 10
    },
    {
      name: 'Standard Package',
      category: categories[1]._id,
      description:
        'Upgrade your pet’s spa experience with our Standard Package. Along with all the Basic services, your pet will enjoy a deep conditioning treatment to soften and detangle their coat, followed by a relaxing paw massage. This package also includes a spritz of our signature pet-safe fragrance.',
      image: 'standard.jpg',
      price: 40.00, // Updated to USD
      quantity: 10
    },
    {
      name: 'Premium Package',
      category: categories[2]._id,
      description:
        'Our Premium Package offers a luxurious spa experience for your pet. In addition to all Standard services, this package includes a soothing oatmeal or hypoallergenic bath tailored to their skin type, teeth brushing for fresh breath, and a blueberry facial to brighten their fur. Your pet will feel pampered from head to tail.',
      image: 'premium.jpg',
      price: 60.00, // Updated to USD
      quantity: 5
    },
    {
      name: 'Premium Package',
      category: categories[2]._id,
      description:
        'Our Premium Package offers a luxurious spa experience for your pet. In addition to all Standard services, this package includes a soothing oatmeal or hypoallergenic bath tailored to their skin type, teeth brushing for fresh breath, and a blueberry facial to brighten their fur. Your pet will feel pampered from head to tail.',
      image: 'premium.jpg',
      price: 60.00, // Updated to USD
    },
    {
      name: 'Deluxe Package',
      category: categories[3]._id,
      description:
        'For the ultimate spa indulgence, treat your pet to our Deluxe Package. This all-inclusive experience features everything from the Premium Package, plus a full-body massage to ease tension, a warm towel wrap for deep relaxation, and a personalized grooming session tailored to their unique style. We will finish with a gourmet treat and a complimentary bandana or bow.',
      image: 'deluxe.jpg',
      price: 80.00, // Updated to USD
      quantity: 5
    },
    {
      name: 'Deluxe Package',
      category: categories[3]._id,
      description:
        'For the ultimate spa indulgence, treat your pet to our Deluxe Package. This all-inclusive experience features everything from the Premium Package, plus a full-body massage to ease tension, a warm towel wrap for deep relaxation, and a personalized grooming session tailored to their unique style. We will finish with a gourmet treat and a complimentary bandana or bow.',
      image: 'deluxe.jpg',
      price: 80.00, // Updated to USD
      quantity: 3
    },
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Stella',
    lastName: 'Ling',
    email: 'stella@testmail.com',
    password: 'password62707',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Michelle',
    lastName: 'Holt',
    email: 'mholt@testmail.com',
    password: 'password62707'
  });

  console.log('users seeded');

  process.exit();
});
