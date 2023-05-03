const Meal = require('../models/meals.model');
const catchAsync = require('../helpers/catchAsync');
const Restaurant = require('../models/restaurants.model');

exports.createMeals = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({
    status: 'success',
    meal,
  });
});

exports.findAllMeals = catchAsync(async (req, res) => {
  const meals = await Meal.findAll({
    status: 'active',

    include: [
      {
        model: Restaurant,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    results: meals.length,
    meals,
  });
});

exports.findOneMeals = catchAsync(async (req, res) => {
  const { meal } = req;

  res.status(200).json({
    status: 'success',
    meal,
  });
});

exports.updateMeals = catchAsync(async (req, res) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({
    name,
    price,
  });

  res.status(200).json({
    statu: 'success',
    message: 'Meal update',
    meal,
  });
});

exports.deleteMeals = catchAsync(async (req, res) => {
  const { meal } = req;
  await meal.update({
    status: 'disabled',
  });

  res.status(200).json({
    status: 'success',
    message: 'Meal disabled',
  });
});
