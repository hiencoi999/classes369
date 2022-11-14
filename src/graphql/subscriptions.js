/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClassMember = /* GraphQL */ `
  subscription OnCreateClassMember(
    $filter: ModelSubscriptionClassMemberFilterInput
  ) {
    onCreateClassMember(filter: $filter) {
      id
      classID
      userID
      role
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
      classID
      userID
      role
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
      classID
      userID
      role
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
      ClassMembers {
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
      ClassMembers {
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
      ClassMembers {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike($filter: ModelSubscriptionLikeFilterInput) {
    onCreateLike(filter: $filter) {
      id
      authorId
      postID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike($filter: ModelSubscriptionLikeFilterInput) {
    onUpdateLike(filter: $filter) {
      id
      authorId
      postID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike($filter: ModelSubscriptionLikeFilterInput) {
    onDeleteLike(filter: $filter) {
      id
      authorId
      postID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
      id
      postId
      authorId
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
      id
      postId
      authorId
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
      id
      postId
      authorId
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      authorId
      receiverId
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      authorId
      receiverId
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      authorId
      receiverId
      content
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
      mediaUrl
      Comments {
        nextToken
      }
      Likes {
        nextToken
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
      mediaUrl
      Comments {
        nextToken
      }
      Likes {
        nextToken
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
      mediaUrl
      Comments {
        nextToken
      }
      Likes {
        nextToken
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
