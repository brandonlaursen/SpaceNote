"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Notes",
      [
        {
          userId: 1,
          notebookId: 1,
          title: "Earth",
          content:
            "Earth’s atmosphere protects us from meteoroids and radiation from the Sun.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 1,
          title: "Venus",
          content: "Venus is the hottest planet in the solar system.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 1,
          title: "Saturn",
          content:
            "Saturn has more moons than any other planet in the Solar System.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 1,
          title: "Mercury",
          content:
            "Mercury’s craters are named after famous artists, musicians and authors",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 1,
          title: "Jupiter",
          content:
            "Jupiter has more than double the mass of all the other planets combined",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 1,
          title: "Uranus",
          content:
            "Uranus has only been visited by a single spacecraft, Voyager 2.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 1,
          title: "Neptune",
          content:
            "It takes like more than 4 hours for light to reach Neptune from the Sun.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 1,
          title: "Mars",
          content: "The distance of Mars from the Sun is 227.9 million km. ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 1,
          title: "Pluto",
          content:
            "Pluto was reclassified from a planet to a dwarf planet in 2006.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 2,
          title: "JavaScript",
          content:
            "JavaScript is a scripting language developed to enable Web authors to design interactive sites.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 2,
          title: "Python",
          content:
            "This name ‘Python’ is extracted from a British comedy series, “Monty Python’s Flying Circus”. ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 2,
          title: "C++",
          content:
            "C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or 'C with Classes'.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 3,
          title: "Algebra",
          content:
            "The roots of this subject dates back to 1900 BC when it was traced that it was Babylonians who came up with Algebra.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 3,
          title: "Trigonometry",
          content:
            "The Babylonians beat the Greeks to the invention of trigonometry - the study of triangles - by more than 1000 years.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 3,
          title: "Calculus",
          content:
            "Calculus is a mathematical science with a primary focus to study how things change.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 4,
          title: "Physics",
          content: "Atoms have 99.9999999999999% empty space.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 4,
          title: "Biology",
          content:
            "The cardiovascular (or circulatory) system transports blood, oxygen, and nutrients throughout the body.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 4,
          title: "Chemistry",
          content:
            "All matter is made up of the chemical elements, which are distinguished from each other by the numbers of protons they possess.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 5,
          title: "Do Laundry",
          content: "Dont forget to do your laundry!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 5,
          title: "Homework",
          content: "Homework is due Friday night",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 5,
          title: "Go to the Gym",
          content: "Today is chest day, dont be late!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 6,
          title: "USA",
          content:
            "In 1783, the United States became the first country to gain independence from a European power.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 6,
          title: "Greek",
          content:
            "The history of Greece encompasses the history of the territory of the modern nation-state of Greece as well as that of the Greek people and the areas they inhabited and ruled historically.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          notebookId: 6,
          title: "Roman",
          content: "Rome was founded in 753BC by its first king, Romulus.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          notebookId: 7,
          title: "My First Note",
          content: "Write your first note!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          notebookId: 7,
          title: "My Second Note",
          content: "Second note",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          notebookId: 7,
          title: "My Third Note",
          content: "Third note",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          notebookId: 10,
          title: "My First Note",
          content: "Write your first note!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          notebookId: 10,
          title: "My Second Note",
          content: "Second note",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          notebookId: 10,
          title: "My Third Note",
          content: "Third note",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Notes", null, {});
  },
};
