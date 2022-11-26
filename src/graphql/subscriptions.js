/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClassMember = /* GraphQL */ `
  subscription OnCreateClassMember(
    $filter: ModelSubscriptionClassMemberFilterInput
  ) {
    onCreateClassMember(filter: $filter) {
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
export const onUpdateClassMember = /* GraphQL */ `
  subscription OnUpdateClassMember(
    $filter: ModelSubscriptionClassMemberFilterInput
  ) {
    onUpdateClassMember(filter: $filter) {
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
export const onDeleteClassMember = /* GraphQL */ `
  subscription OnDeleteClassMember(
    $filter: ModelSubscriptionClassMemberFilterInput
  ) {
    onDeleteClassMember(filter: $filter) {
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
export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass($filter: ModelSubscriptionClassFilterInput) {
    onCreateClass(filter: $filter) {
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
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass($filter: ModelSubscriptionClassFilterInput) {
    onUpdateClass(filter: $filter) {
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
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass($filter: ModelSubscriptionClassFilterInput) {
    onDeleteClass(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateClassInvitation = /* GraphQL */ `
  subscription OnCreateClassInvitation(
    $filter: ModelSubscriptionClassInvitationFilterInput
  ) {
    onCreateClassInvitation(filter: $filter) {
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
export const onUpdateClassInvitation = /* GraphQL */ `
  subscription OnUpdateClassInvitation(
    $filter: ModelSubscriptionClassInvitationFilterInput
  ) {
    onUpdateClassInvitation(filter: $filter) {
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
export const onDeleteClassInvitation = /* GraphQL */ `
  subscription OnDeleteClassInvitation(
    $filter: ModelSubscriptionClassInvitationFilterInput
  ) {
    onDeleteClassInvitation(filter: $filter) {
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
