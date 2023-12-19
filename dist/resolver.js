import { ObjectId } from 'mongodb';
import students, { teachers } from './db/conn.js';
const resolvers = {
    Student: {
        id: (parent) => parent.id ?? parent._id,
    },
    Query: {
        student: async (id) => {
            const query = { _id: new ObjectId(id) };
            const student = await students
                .collection('students')
                .findOne(query);
            return student;
        },
    },
    Mutation: {
        studentCreate: async (input) => {
            const now = new Date();
            const student = {
                name: input.name,
                isActive: true,
                availableHours: input.availableHours,
                grade: input.grade,
                school: input.school,
                district: input.district,
                createdAt: now,
                updatedAt: now,
            };
            const id = await students
                .collection('students')
                .insertOne(student)
                .then((result) => result.insertedId);
            return { ...student, id };
        },
        studentUpdate: async (input) => {
            const now = new Date();
            await students.collection('students').updateOne({
                name: input.name,
            }, {
                isActive: input.isActive,
                addedHours: input.addedHours,
            });
        },
        teacherCreate: async (input) => {
            const now = new Date();
            await teachers.collection('students').insertOne({
                name: input.name,
                isActive: true,
                hourlyPay: input.hourlyPay,
                deferredPay: input.deferredPay,
                createdAt: now,
                updatedAt: now,
            });
        },
        teacherUpdate: async (input) => {
            const now = new Date();
            await teachers.collection('students').updateOne({
                name: input.name,
            }, {
                isActive: input.isActive,
                hourlyPay: input.hourlyPay,
                deferredPay: input.deferredPay,
            });
        },
    },
};
export default resolvers;
//# sourceMappingURL=resolver.js.map