// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const RoleEnum = {
  "MANAGER": "MANAGER",
  "STUDENT": "STUDENT"
};

const { ClassMember, Class, Like, Comment, Message, Post, User } = initSchema(schema);

export {
  ClassMember,
  Class,
  Like,
  Comment,
  Message,
  Post,
  User,
  RoleEnum
};