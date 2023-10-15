const { Student } = require("./models/Student");
const resolvers = {
  Query: {
    greetings: () => "GraphQL is Awesome ",
    welcome: (parent, args) => `Hello ${args.name}`,
    students: async () => await Student.find({}),
    student: async (parent, args) => await Student.findById(args.id),
  },
  Mutation: {
    create: async (parent, args) => {
      const { firstName, lastName, age } = args;
      const newStudent = new Student({
        firstName,
        lastName,
        age,
      });
      await newStudent.save();
      return newStudent;
    },
    update: async (parent, args) => {
      const { id } = args;
      const updatedStudent = await Student.findByIdAndUpdate(id, args);
      if (!updatedStudent) {
        throw new Error(
          `Student with id ${id} is not in the Database ! Ensure you entered the correct id`
        );
      }
      return updatedStudent;
    },

    delete: async (parent, args) => {
      const { id } = args;
      const deletedStudent = await Student.findByIdAndDelete(id);
      if (!deletedStudent) {
        throw new Error(
          `Student with id ${id} is not in the Database ! Ensure you entered the correct id`
        );
      }
      return deletedStudent;
    },
  },
};

module.exports = { resolvers };
