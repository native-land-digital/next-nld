import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type CategoriesOnIssues = {
    id: Generated<number>;
    issueId: number;
    categoryId: number;
};
export type Change = {
    id: Generated<number>;
    createdAt: Timestamp;
    description: string | null;
    entryId: number;
};
export type Entry = {
    id: Generated<number>;
    name: string;
    slug: string | null;
    color: string | null;
    sources: string | null;
    pronunciation: string | null;
    category: string | null;
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
export type Issue = {
    id: Generated<number>;
    name: string;
    open: Generated<boolean>;
    createdAt: Generated<Timestamp>;
    entryId: number | null;
    authorId: number | null;
};
export type IssueCategory = {
    id: Generated<number>;
    name: string;
};
export type IssueComment = {
    id: Generated<number>;
    comment: string;
    issueId: number;
    authorId: number;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type IssueMedia = {
    id: Generated<number>;
    url: string;
    issueCommentId: number;
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
export type UsersOnIssues = {
    id: Generated<number>;
    issueId: number;
    userId: number;
};
export type Website = {
    id: Generated<number>;
    url: string;
    title: string | null;
    entryId: number;
};
export type DB = {
    CategoriesOnIssues: CategoriesOnIssues;
    Change: Change;
    Entry: Entry;
    GlobalPermission: GlobalPermission;
    Greeting: Greeting;
    Issue: Issue;
    IssueCategory: IssueCategory;
    IssueComment: IssueComment;
    IssueMedia: IssueMedia;
    ItemPermission: ItemPermission;
    Line: Line;
    Media: Media;
    PermissionAction: PermissionAction;
    PermissionEntity: PermissionEntity;
    Point: Point;
    Polygon: Polygon;
    Relation: Relation;
    User: User;
    UsersOnIssues: UsersOnIssues;
    Website: Website;
};
