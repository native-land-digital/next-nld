import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type CategoriesOnContributions = {
    id: Generated<number>;
    contributionId: number;
    categoryId: number;
};
export type Change = {
    id: Generated<number>;
    createdAt: Timestamp;
    description: string | null;
    entryId: number;
};
export type Contribution = {
    id: Generated<number>;
    name: string;
    open: Generated<boolean>;
    stageId: number;
    createdAt: Generated<Timestamp>;
    authorId: number | null;
};
export type ContributionCategory = {
    id: Generated<number>;
    name: string;
    color: string;
};
export type ContributionComment = {
    id: Generated<number>;
    comment: string;
    contributionId: number;
    authorId: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type ContributionMedia = {
    id: Generated<number>;
    url: string;
    contributionCommentId: number;
};
export type ContributionStage = {
    id: Generated<number>;
    name: string;
    color: string;
};
export type EntriesOnContributions = {
    id: Generated<number>;
    contributionId: number;
    entryId: number;
};
export type Entry = {
    id: Generated<number>;
    name: string;
    slug: string | null;
    color: string | null;
    sources: string | null;
    disclaimer: string | null;
    category: string | null;
    language: string | null;
    published: Generated<boolean>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type GlobalPermission = {
    id: Generated<number>;
    columnNames: string[];
    actionId: number;
    entityId: number;
    userId: number;
};
export type Greeting = {
    id: Generated<number>;
    url: string;
    text: string | null;
    translation: string | null;
    usage: string | null;
    parentId: number | null;
    entryId: number;
};
export type ItemPermission = {
    id: Generated<number>;
    columnNames: string[];
    entryId: number;
    actionId: number;
    entityId: number;
    userId: number;
};
export type Line = {
    id: Generated<number>;
    entryId: number;
};
export type Media = {
    id: Generated<number>;
    url: string;
    title: string | null;
    caption: string | null;
    entryId: number;
};
export type PermissionAction = {
    id: Generated<number>;
    name: string;
};
export type PermissionEntity = {
    id: Generated<number>;
    name: string;
};
export type Point = {
    id: Generated<number>;
    osmType: string | null;
    osmId: string | null;
    entryId: number;
};
export type Polygon = {
    id: Generated<number>;
    entryId: number;
};
export type Pronunciation = {
    id: Generated<number>;
    url: string | null;
    text: string | null;
    entryId: number;
};
export type Relation = {
    id: Generated<number>;
    description: string | null;
    relatedToId: number;
    relatedFromId: number;
};
export type User = {
    id: Generated<number>;
    createdAt: Generated<Timestamp>;
    email: string;
    password: string;
    name: string | null;
    permissions: Generated<string[]>;
    organization: string | null;
    verification_key: Generated<string | null>;
    email_verified: Generated<boolean>;
    agreed_treaty: Generated<boolean>;
    api_key: Generated<string | null>;
};
export type UsersOnContributions = {
    id: Generated<number>;
    contributionId: number;
    userId: number;
};
export type Verification = {
    id: Generated<number>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    verified: Generated<boolean>;
    details: string | null;
    entryId: number;
};
export type Website = {
    id: Generated<number>;
    url: string;
    title: string | null;
    entryId: number;
};
export type DB = {
    CategoriesOnContributions: CategoriesOnContributions;
    Change: Change;
    Contribution: Contribution;
    ContributionCategory: ContributionCategory;
    ContributionComment: ContributionComment;
    ContributionMedia: ContributionMedia;
    ContributionStage: ContributionStage;
    EntriesOnContributions: EntriesOnContributions;
    Entry: Entry;
    GlobalPermission: GlobalPermission;
    Greeting: Greeting;
    ItemPermission: ItemPermission;
    Line: Line;
    Media: Media;
    PermissionAction: PermissionAction;
    PermissionEntity: PermissionEntity;
    Point: Point;
    Polygon: Polygon;
    Pronunciation: Pronunciation;
    Relation: Relation;
    User: User;
    UsersOnContributions: UsersOnContributions;
    Verification: Verification;
    Website: Website;
};
