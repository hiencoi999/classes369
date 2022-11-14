import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum RoleEnum {
  MANAGER = "MANAGER",
  STUDENT = "STUDENT"
}

type ClassMemberMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ClassMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LikeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}



type MessageMetaData = {
  readOnlyFields: 'updatedAt';
}



type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerClassMember = {
  readonly id: string;
  readonly classID: string;
  readonly userID: string;
  readonly role?: RoleEnum | keyof typeof RoleEnum | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyClassMember = {
  readonly id: string;
  readonly classID: string;
  readonly userID: string;
  readonly role?: RoleEnum | keyof typeof RoleEnum | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ClassMember = LazyLoading extends LazyLoadingDisabled ? EagerClassMember : LazyClassMember

export declare const ClassMember: (new (init: ModelInit<ClassMember, ClassMemberMetaData>) => ClassMember) & {
  copyOf(source: ClassMember, mutator: (draft: MutableModel<ClassMember, ClassMemberMetaData>) => MutableModel<ClassMember, ClassMemberMetaData> | void): ClassMember;
}

type EagerClass = {
  readonly id: string;
  readonly name?: string | null;
  readonly ClassMembers?: (ClassMember | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyClass = {
  readonly id: string;
  readonly name?: string | null;
  readonly ClassMembers: AsyncCollection<ClassMember>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Class = LazyLoading extends LazyLoadingDisabled ? EagerClass : LazyClass

export declare const Class: (new (init: ModelInit<Class, ClassMetaData>) => Class) & {
  copyOf(source: Class, mutator: (draft: MutableModel<Class, ClassMetaData>) => MutableModel<Class, ClassMetaData> | void): Class;
}

type EagerLike = {
  readonly id: string;
  readonly authorId: string;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLike = {
  readonly id: string;
  readonly authorId: string;
  readonly postID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Like = LazyLoading extends LazyLoadingDisabled ? EagerLike : LazyLike

export declare const Like: (new (init: ModelInit<Like, LikeMetaData>) => Like) & {
  copyOf(source: Like, mutator: (draft: MutableModel<Like, LikeMetaData>) => MutableModel<Like, LikeMetaData> | void): Like;
}

type EagerComment = {
  readonly id: string;
  readonly postId: string;
  readonly authorId: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComment = {
  readonly id: string;
  readonly postId: string;
  readonly authorId: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comment = LazyLoading extends LazyLoadingDisabled ? EagerComment : LazyComment

export declare const Comment: (new (init: ModelInit<Comment>) => Comment) & {
  copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

type EagerMessage = {
  readonly id: string;
  readonly authorId: string;
  readonly receiverId: string;
  readonly content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly id: string;
  readonly authorId: string;
  readonly receiverId: string;
  readonly content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message, MessageMetaData>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

type EagerPost = {
  readonly id: string;
  readonly authorId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly description: string;
  readonly mediaUrl?: string | null;
  readonly Comments?: (Comment | null)[] | null;
  readonly Likes?: (Like | null)[] | null;
}

type LazyPost = {
  readonly id: string;
  readonly authorId: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly description: string;
  readonly mediaUrl?: string | null;
  readonly Comments: AsyncCollection<Comment>;
  readonly Likes: AsyncCollection<Like>;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

type EagerUser = {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly birthday?: string | null;
  readonly avatarUrl?: string | null;
  readonly Posts?: (Post | null)[] | null;
  readonly Messages?: (Message | null)[] | null;
  readonly Comments?: (Comment | null)[] | null;
  readonly Likes?: (Like | null)[] | null;
  readonly email?: string | null;
  readonly phoneNumber?: string | null;
  readonly ClassMembers?: (ClassMember | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly birthday?: string | null;
  readonly avatarUrl?: string | null;
  readonly Posts: AsyncCollection<Post>;
  readonly Messages: AsyncCollection<Message>;
  readonly Comments: AsyncCollection<Comment>;
  readonly Likes: AsyncCollection<Like>;
  readonly email?: string | null;
  readonly phoneNumber?: string | null;
  readonly ClassMembers: AsyncCollection<ClassMember>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User, UserMetaData>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}