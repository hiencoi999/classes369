/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClassMember = /* GraphQL */ `
  query GetClassMember($id: ID!) {
    getClassMember(id: $id) {
      id
      classId
      userId
      role
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
        role
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
      id
      authorId
      postId
      createdAt
      updatedAt
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorId
        postId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postId
      authorId
      description
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        authorId
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      authorId
      receiverId
      content
      createdAt
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorId
        receiverId
        content
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
      Comments {
        nextToken
      }
      Likes {
        nextToken
      }
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
      Posts {
        nextToken
      }
      Messages {
        nextToken
      }
      Comments {
        nextToken
      }
      Likes {
        nextToken
      }
      email
      phoneNumber
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
