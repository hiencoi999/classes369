/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClassMember = /* GraphQL */ `
  mutation CreateClassMember(
    $input: CreateClassMemberInput!
    $condition: ModelClassMemberConditionInput
  ) {
    createClassMember(input: $input, condition: $condition) {
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
export const updateClassMember = /* GraphQL */ `
  mutation UpdateClassMember(
    $input: UpdateClassMemberInput!
    $condition: ModelClassMemberConditionInput
  ) {
    updateClassMember(input: $input, condition: $condition) {
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
export const deleteClassMember = /* GraphQL */ `
  mutation DeleteClassMember(
    $input: DeleteClassMemberInput!
    $condition: ModelClassMemberConditionInput
  ) {
    deleteClassMember(input: $input, condition: $condition) {
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
export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
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
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
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
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createClassInvitation = /* GraphQL */ `
  mutation CreateClassInvitation(
    $input: CreateClassInvitationInput!
    $condition: ModelClassInvitationConditionInput
  ) {
    createClassInvitation(input: $input, condition: $condition) {
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
export const updateClassInvitation = /* GraphQL */ `
  mutation UpdateClassInvitation(
    $input: UpdateClassInvitationInput!
    $condition: ModelClassInvitationConditionInput
  ) {
    updateClassInvitation(input: $input, condition: $condition) {
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
export const deleteClassInvitation = /* GraphQL */ `
  mutation DeleteClassInvitation(
    $input: DeleteClassInvitationInput!
    $condition: ModelClassInvitationConditionInput
  ) {
    deleteClassInvitation(input: $input, condition: $condition) {
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
