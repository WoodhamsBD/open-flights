# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
airlines = Airline.create([
  {
    name: "United Airlines",
    image_url: "test URL"
  },
  {
    name: "Southwest",
    image_url: "Second test"
  }
])

review  = Review.create([
  {
    title: 'Solid Airline',
    description: "A gravity defying time",
    score: 5,
    airline: airlines.first
  },
  {
    title: "Tough ride",
    description: "Poor flight",
    score: 2,
    airline: airlines.first
  }
])