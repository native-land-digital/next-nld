import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

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
export type Greeting = {
    id: Generated<number>;
    url: string;
    text: string | null;
    translation: string | null;
    usage: string | null;
    parentId: number | null;
    entryId: number;
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
export type PermissionDetail = {
    id: Generated<number>;
    columnName: string | null;
    appliesToAll: boolean;
    actionId: number;
    entityId: number;
    userId: number;
};
export type PermissionEntity = {
    id: Generated<number>;
    name: string;
};
export type Point = {
    id: Generated<number>;
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
export type Website = {
    id: Generated<number>;
    url: string;
    title: string | null;
    entryId: number;
};
export type DB = {
    Change: Change;
    Entry: Entry;
    Greeting: Greeting;
    Line: Line;
    Media: Media;
    PermissionAction: PermissionAction;
    PermissionDetail: PermissionDetail;
    PermissionEntity: PermissionEntity;
    Point: Point;
    Polygon: Polygon;
    Relation: Relation;
    User: User;
    Website: Website;
};
