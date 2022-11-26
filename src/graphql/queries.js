/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClassMember = /* GraphQL */ `
  query GetClassMember($id: ID!) {
    getClassMember(id: $id) {
      id
      classId
      userId
      class {
        id
        name
        ownerId
        createdAt
        updatedAt
      }
      user {
        id
        firstName
        lastName
        birthday
        avatarUrl
        email
        phoneNumber
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listClassMembers = /* GraphQL */ `
  query ListClassMembers(
    $filter: ModelClassMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClassMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        classId
        userId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClass = /* GraphQL */ `
  query GetClass($id: ID!) {
    getClass(id: $id) {
      id
      name
      ownerId
      ClassMembers {
        nextToken
      }
      Posts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listClasses = /* GraphQL */ `
  query ListClasses(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        ownerId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      authorId
      createdAt
      updatedAt
      description
      classId
      title
      deadline
      author {
        id
        firstName
        lastName
        birthday
        avatarUrl
        email
        phoneNumber
        createdAt
        updatedAt
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorId
        createdAt
        updatedAt
        description
        classId
        title
        deadline
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      birthday
      avatarUrl
      email
      phoneNumber
      Posts {
        nextToken
      }
      Classes {
        nextToken
      }
      ClassMembers {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        birthday
        avatarUrl
        email
        phoneNumber
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClassInvitation = /* GraphQL */ `
  query GetClassInvitation($id: ID!) {
    getClassInvitation(id: $id) {
      id
      classInviteId
      targetEmail
      hostEmail
      nameOfClass
      createdAt
      updatedAt
    }
  }
`;
export const listClassInvitations = /* GraphQL */ `
  query ListClassInvitations(
    $filter: ModelClassInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClassInvitations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        classInviteId
        targetEmail
        hostEmail
        nameOfClass
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
