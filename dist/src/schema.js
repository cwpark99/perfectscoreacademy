export const typeDefs = `#graphql

type Query {
    students: [Student]
    teachers: [Teacher]
    classes: [Class]
  }

  type Mutation {
    studentCreate(input: StudentCreateInput!): Student
    studentUpdate(input: StudentUpdateInput!): Student

    teacherCreate(input: TeacherCreateInput!): Teacher
    teacherUpdate(input: TeacherUpdateInput!): Teacher

    classCreate(input: ClassCreateInput!): Class
    classUpdate(input: ClassUpdateInput!): Class
  }

  interface User {
    id: String!
    name: String
    isActive: Boolean

    createdAt: Time
    updatedAt: Time
  }

  type Student implements User {
    id: String!
    name: String
    isActive: Boolean
    
    createdAt: Time
    updatedAt: Time

    availableHours: Int
  }
  
  type Teacher implements User {
    id: String!
    name: String
    isActive: Boolean

    createdAt: Time
    updatedAt: Time

    hourlyPay: Float
    deferredPay: Float
  }

  type Class {
    classType: ClassType
    teacher: Teacher
    students: [Student]
    
    startsAt: Time
    endsAt: Time

    status: Boolean
  }

  enum ClassType {
    PRIVATE
    GROUP
    ONLINE
  }

  type StudentCreateInput {
    name: String
    availableHours: Int
  }

  type StudentUpdateInput {
    name: String
    isActive: Boolean
    addedHours: Int
  }

  type TeacherCreateInput {
    name: String
    hourlyPay: Float
  }

  type TeacherUpdateInput {
    name: String
    hourlyPay: Float
    deferredPay: Float
  }

  type ClassCreateInput {
    classType: ClassType
    teacher: Teacher
    students: [Student]
  }

  type ClassUpdateInput {
    classType: ClassType
    teacher: Teacher
    students: [Student]

    startsAt: Time
    endsAt: Time
  }
  `;
