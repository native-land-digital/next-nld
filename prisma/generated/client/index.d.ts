
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Media
 * 
 */
export type Media = $Result.DefaultSelection<Prisma.$MediaPayload>
/**
 * Model Website
 * 
 */
export type Website = $Result.DefaultSelection<Prisma.$WebsitePayload>
/**
 * Model Change
 * 
 */
export type Change = $Result.DefaultSelection<Prisma.$ChangePayload>
/**
 * Model Relation
 * 
 */
export type Relation = $Result.DefaultSelection<Prisma.$RelationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Polygon
 * 
 */
export type Polygon = $Result.DefaultSelection<Prisma.$PolygonPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Media
 * const media = await prisma.media.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Media
   * const media = await prisma.media.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.media`: Exposes CRUD operations for the **Media** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Media
    * const media = await prisma.media.findMany()
    * ```
    */
  get media(): Prisma.MediaDelegate<ExtArgs>;

  /**
   * `prisma.website`: Exposes CRUD operations for the **Website** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Websites
    * const websites = await prisma.website.findMany()
    * ```
    */
  get website(): Prisma.WebsiteDelegate<ExtArgs>;

  /**
   * `prisma.change`: Exposes CRUD operations for the **Change** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Changes
    * const changes = await prisma.change.findMany()
    * ```
    */
  get change(): Prisma.ChangeDelegate<ExtArgs>;

  /**
   * `prisma.relation`: Exposes CRUD operations for the **Relation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Relations
    * const relations = await prisma.relation.findMany()
    * ```
    */
  get relation(): Prisma.RelationDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.polygon`: Exposes CRUD operations for the **Polygon** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Polygons
    * const polygons = await prisma.polygon.findMany()
    * ```
    */
  get polygon(): Prisma.PolygonDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.19.1
   * Query Engine version: 06fc58a368dc7be9fbbbe894adf8d445d208c284
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Media: 'Media',
    Website: 'Website',
    Change: 'Change',
    Relation: 'Relation',
    User: 'User',
    Polygon: 'Polygon'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "media" | "website" | "change" | "relation" | "user" | "polygon"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Media: {
        payload: Prisma.$MediaPayload<ExtArgs>
        fields: Prisma.MediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findFirst: {
            args: Prisma.MediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findMany: {
            args: Prisma.MediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          create: {
            args: Prisma.MediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          createMany: {
            args: Prisma.MediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          delete: {
            args: Prisma.MediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          update: {
            args: Prisma.MediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          deleteMany: {
            args: Prisma.MediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          aggregate: {
            args: Prisma.MediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedia>
          }
          groupBy: {
            args: Prisma.MediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaCountArgs<ExtArgs>
            result: $Utils.Optional<MediaCountAggregateOutputType> | number
          }
        }
      }
      Website: {
        payload: Prisma.$WebsitePayload<ExtArgs>
        fields: Prisma.WebsiteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebsiteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebsiteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          findFirst: {
            args: Prisma.WebsiteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebsiteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          findMany: {
            args: Prisma.WebsiteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>[]
          }
          create: {
            args: Prisma.WebsiteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          createMany: {
            args: Prisma.WebsiteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebsiteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>[]
          }
          delete: {
            args: Prisma.WebsiteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          update: {
            args: Prisma.WebsiteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          deleteMany: {
            args: Prisma.WebsiteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebsiteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WebsiteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebsitePayload>
          }
          aggregate: {
            args: Prisma.WebsiteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebsite>
          }
          groupBy: {
            args: Prisma.WebsiteGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebsiteGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebsiteCountArgs<ExtArgs>
            result: $Utils.Optional<WebsiteCountAggregateOutputType> | number
          }
        }
      }
      Change: {
        payload: Prisma.$ChangePayload<ExtArgs>
        fields: Prisma.ChangeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChangeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChangeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangePayload>
          }
          findFirst: {
            args: Prisma.ChangeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChangeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangePayload>
          }
          findMany: {
            args: Prisma.ChangeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangePayload>[]
          }
          create: {
            args: Prisma.ChangeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangePayload>
          }
          createMany: {
            args: Prisma.ChangeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChangeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangePayload>[]
          }
          delete: {
            args: Prisma.ChangeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangePayload>
          }
          update: {
            args: Prisma.ChangeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangePayload>
          }
          deleteMany: {
            args: Prisma.ChangeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChangeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChangeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangePayload>
          }
          aggregate: {
            args: Prisma.ChangeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChange>
          }
          groupBy: {
            args: Prisma.ChangeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChangeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChangeCountArgs<ExtArgs>
            result: $Utils.Optional<ChangeCountAggregateOutputType> | number
          }
        }
      }
      Relation: {
        payload: Prisma.$RelationPayload<ExtArgs>
        fields: Prisma.RelationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RelationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RelationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationPayload>
          }
          findFirst: {
            args: Prisma.RelationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RelationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationPayload>
          }
          findMany: {
            args: Prisma.RelationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationPayload>[]
          }
          create: {
            args: Prisma.RelationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationPayload>
          }
          createMany: {
            args: Prisma.RelationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RelationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationPayload>[]
          }
          delete: {
            args: Prisma.RelationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationPayload>
          }
          update: {
            args: Prisma.RelationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationPayload>
          }
          deleteMany: {
            args: Prisma.RelationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RelationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RelationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationPayload>
          }
          aggregate: {
            args: Prisma.RelationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRelation>
          }
          groupBy: {
            args: Prisma.RelationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RelationGroupByOutputType>[]
          }
          count: {
            args: Prisma.RelationCountArgs<ExtArgs>
            result: $Utils.Optional<RelationCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Polygon: {
        payload: Prisma.$PolygonPayload<ExtArgs>
        fields: Prisma.PolygonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PolygonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolygonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PolygonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolygonPayload>
          }
          findFirst: {
            args: Prisma.PolygonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolygonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PolygonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolygonPayload>
          }
          findMany: {
            args: Prisma.PolygonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolygonPayload>[]
          }
          create: {
            args: Prisma.PolygonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolygonPayload>
          }
          createMany: {
            args: Prisma.PolygonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PolygonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolygonPayload>[]
          }
          delete: {
            args: Prisma.PolygonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolygonPayload>
          }
          update: {
            args: Prisma.PolygonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolygonPayload>
          }
          deleteMany: {
            args: Prisma.PolygonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PolygonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PolygonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolygonPayload>
          }
          aggregate: {
            args: Prisma.PolygonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePolygon>
          }
          groupBy: {
            args: Prisma.PolygonGroupByArgs<ExtArgs>
            result: $Utils.Optional<PolygonGroupByOutputType>[]
          }
          count: {
            args: Prisma.PolygonCountArgs<ExtArgs>
            result: $Utils.Optional<PolygonCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PolygonCountOutputType
   */

  export type PolygonCountOutputType = {
    media: number
    websites: number
    changelog: number
    relatedTo: number
    relatedFrom: number
  }

  export type PolygonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | PolygonCountOutputTypeCountMediaArgs
    websites?: boolean | PolygonCountOutputTypeCountWebsitesArgs
    changelog?: boolean | PolygonCountOutputTypeCountChangelogArgs
    relatedTo?: boolean | PolygonCountOutputTypeCountRelatedToArgs
    relatedFrom?: boolean | PolygonCountOutputTypeCountRelatedFromArgs
  }

  // Custom InputTypes
  /**
   * PolygonCountOutputType without action
   */
  export type PolygonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolygonCountOutputType
     */
    select?: PolygonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PolygonCountOutputType without action
   */
  export type PolygonCountOutputTypeCountMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
  }

  /**
   * PolygonCountOutputType without action
   */
  export type PolygonCountOutputTypeCountWebsitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebsiteWhereInput
  }

  /**
   * PolygonCountOutputType without action
   */
  export type PolygonCountOutputTypeCountChangelogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChangeWhereInput
  }

  /**
   * PolygonCountOutputType without action
   */
  export type PolygonCountOutputTypeCountRelatedToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RelationWhereInput
  }

  /**
   * PolygonCountOutputType without action
   */
  export type PolygonCountOutputTypeCountRelatedFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RelationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Media
   */

  export type AggregateMedia = {
    _count: MediaCountAggregateOutputType | null
    _avg: MediaAvgAggregateOutputType | null
    _sum: MediaSumAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  export type MediaAvgAggregateOutputType = {
    id: number | null
    polygonId: number | null
  }

  export type MediaSumAggregateOutputType = {
    id: number | null
    polygonId: number | null
  }

  export type MediaMinAggregateOutputType = {
    id: number | null
    url: string | null
    title: string | null
    caption: string | null
    polygonId: number | null
  }

  export type MediaMaxAggregateOutputType = {
    id: number | null
    url: string | null
    title: string | null
    caption: string | null
    polygonId: number | null
  }

  export type MediaCountAggregateOutputType = {
    id: number
    url: number
    title: number
    caption: number
    polygonId: number
    _all: number
  }


  export type MediaAvgAggregateInputType = {
    id?: true
    polygonId?: true
  }

  export type MediaSumAggregateInputType = {
    id?: true
    polygonId?: true
  }

  export type MediaMinAggregateInputType = {
    id?: true
    url?: true
    title?: true
    caption?: true
    polygonId?: true
  }

  export type MediaMaxAggregateInputType = {
    id?: true
    url?: true
    title?: true
    caption?: true
    polygonId?: true
  }

  export type MediaCountAggregateInputType = {
    id?: true
    url?: true
    title?: true
    caption?: true
    polygonId?: true
    _all?: true
  }

  export type MediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to aggregate.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Media
    **/
    _count?: true | MediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaMaxAggregateInputType
  }

  export type GetMediaAggregateType<T extends MediaAggregateArgs> = {
        [P in keyof T & keyof AggregateMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedia[P]>
      : GetScalarType<T[P], AggregateMedia[P]>
  }




  export type MediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithAggregationInput | MediaOrderByWithAggregationInput[]
    by: MediaScalarFieldEnum[] | MediaScalarFieldEnum
    having?: MediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaCountAggregateInputType | true
    _avg?: MediaAvgAggregateInputType
    _sum?: MediaSumAggregateInputType
    _min?: MediaMinAggregateInputType
    _max?: MediaMaxAggregateInputType
  }

  export type MediaGroupByOutputType = {
    id: number
    url: string
    title: string | null
    caption: string | null
    polygonId: number
    _count: MediaCountAggregateOutputType | null
    _avg: MediaAvgAggregateOutputType | null
    _sum: MediaSumAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  type GetMediaGroupByPayload<T extends MediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaGroupByOutputType[P]>
            : GetScalarType<T[P], MediaGroupByOutputType[P]>
        }
      >
    >


  export type MediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    caption?: boolean
    polygonId?: boolean
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>

  export type MediaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    caption?: boolean
    polygonId?: boolean
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>

  export type MediaSelectScalar = {
    id?: boolean
    url?: boolean
    title?: boolean
    caption?: boolean
    polygonId?: boolean
  }

  export type MediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }
  export type MediaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }

  export type $MediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Media"
    objects: {
      polygon: Prisma.$PolygonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      title: string | null
      caption: string | null
      polygonId: number
    }, ExtArgs["result"]["media"]>
    composites: {}
  }

  type MediaGetPayload<S extends boolean | null | undefined | MediaDefaultArgs> = $Result.GetResult<Prisma.$MediaPayload, S>

  type MediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MediaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MediaCountAggregateInputType | true
    }

  export interface MediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Media'], meta: { name: 'Media' } }
    /**
     * Find zero or one Media that matches the filter.
     * @param {MediaFindUniqueArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaFindUniqueArgs>(args: SelectSubset<T, MediaFindUniqueArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Media that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MediaFindUniqueOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaFindFirstArgs>(args?: SelectSubset<T, MediaFindFirstArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Media that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Media
     * const media = await prisma.media.findMany()
     * 
     * // Get first 10 Media
     * const media = await prisma.media.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaWithIdOnly = await prisma.media.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaFindManyArgs>(args?: SelectSubset<T, MediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Media.
     * @param {MediaCreateArgs} args - Arguments to create a Media.
     * @example
     * // Create one Media
     * const Media = await prisma.media.create({
     *   data: {
     *     // ... data to create a Media
     *   }
     * })
     * 
     */
    create<T extends MediaCreateArgs>(args: SelectSubset<T, MediaCreateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Media.
     * @param {MediaCreateManyArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaCreateManyArgs>(args?: SelectSubset<T, MediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Media and returns the data saved in the database.
     * @param {MediaCreateManyAndReturnArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Media and only return the `id`
     * const mediaWithIdOnly = await prisma.media.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Media.
     * @param {MediaDeleteArgs} args - Arguments to delete one Media.
     * @example
     * // Delete one Media
     * const Media = await prisma.media.delete({
     *   where: {
     *     // ... filter to delete one Media
     *   }
     * })
     * 
     */
    delete<T extends MediaDeleteArgs>(args: SelectSubset<T, MediaDeleteArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Media.
     * @param {MediaUpdateArgs} args - Arguments to update one Media.
     * @example
     * // Update one Media
     * const media = await prisma.media.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaUpdateArgs>(args: SelectSubset<T, MediaUpdateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Media.
     * @param {MediaDeleteManyArgs} args - Arguments to filter Media to delete.
     * @example
     * // Delete a few Media
     * const { count } = await prisma.media.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaDeleteManyArgs>(args?: SelectSubset<T, MediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaUpdateManyArgs>(args: SelectSubset<T, MediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Media.
     * @param {MediaUpsertArgs} args - Arguments to update or create a Media.
     * @example
     * // Update or create a Media
     * const media = await prisma.media.upsert({
     *   create: {
     *     // ... data to create a Media
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Media we want to update
     *   }
     * })
     */
    upsert<T extends MediaUpsertArgs>(args: SelectSubset<T, MediaUpsertArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaCountArgs} args - Arguments to filter Media to count.
     * @example
     * // Count the number of Media
     * const count = await prisma.media.count({
     *   where: {
     *     // ... the filter for the Media we want to count
     *   }
     * })
    **/
    count<T extends MediaCountArgs>(
      args?: Subset<T, MediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaAggregateArgs>(args: Subset<T, MediaAggregateArgs>): Prisma.PrismaPromise<GetMediaAggregateType<T>>

    /**
     * Group by Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaGroupByArgs['orderBy'] }
        : { orderBy?: MediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Media model
   */
  readonly fields: MediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Media.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    polygon<T extends PolygonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PolygonDefaultArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Media model
   */ 
  interface MediaFieldRefs {
    readonly id: FieldRef<"Media", 'Int'>
    readonly url: FieldRef<"Media", 'String'>
    readonly title: FieldRef<"Media", 'String'>
    readonly caption: FieldRef<"Media", 'String'>
    readonly polygonId: FieldRef<"Media", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Media findUnique
   */
  export type MediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findUniqueOrThrow
   */
  export type MediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findFirst
   */
  export type MediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findFirstOrThrow
   */
  export type MediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findMany
   */
  export type MediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media create
   */
  export type MediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to create a Media.
     */
    data: XOR<MediaCreateInput, MediaUncheckedCreateInput>
  }

  /**
   * Media createMany
   */
  export type MediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Media.
     */
    data: MediaCreateManyInput | MediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Media createManyAndReturn
   */
  export type MediaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Media.
     */
    data: MediaCreateManyInput | MediaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Media update
   */
  export type MediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to update a Media.
     */
    data: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
    /**
     * Choose, which Media to update.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media updateMany
   */
  export type MediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Media.
     */
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyInput>
    /**
     * Filter which Media to update
     */
    where?: MediaWhereInput
  }

  /**
   * Media upsert
   */
  export type MediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The filter to search for the Media to update in case it exists.
     */
    where: MediaWhereUniqueInput
    /**
     * In case the Media found by the `where` argument doesn't exist, create a new Media with this data.
     */
    create: XOR<MediaCreateInput, MediaUncheckedCreateInput>
    /**
     * In case the Media was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
  }

  /**
   * Media delete
   */
  export type MediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter which Media to delete.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media deleteMany
   */
  export type MediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to delete
     */
    where?: MediaWhereInput
  }

  /**
   * Media without action
   */
  export type MediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
  }


  /**
   * Model Website
   */

  export type AggregateWebsite = {
    _count: WebsiteCountAggregateOutputType | null
    _avg: WebsiteAvgAggregateOutputType | null
    _sum: WebsiteSumAggregateOutputType | null
    _min: WebsiteMinAggregateOutputType | null
    _max: WebsiteMaxAggregateOutputType | null
  }

  export type WebsiteAvgAggregateOutputType = {
    id: number | null
    polygonId: number | null
  }

  export type WebsiteSumAggregateOutputType = {
    id: number | null
    polygonId: number | null
  }

  export type WebsiteMinAggregateOutputType = {
    id: number | null
    url: string | null
    title: string | null
    polygonId: number | null
  }

  export type WebsiteMaxAggregateOutputType = {
    id: number | null
    url: string | null
    title: string | null
    polygonId: number | null
  }

  export type WebsiteCountAggregateOutputType = {
    id: number
    url: number
    title: number
    polygonId: number
    _all: number
  }


  export type WebsiteAvgAggregateInputType = {
    id?: true
    polygonId?: true
  }

  export type WebsiteSumAggregateInputType = {
    id?: true
    polygonId?: true
  }

  export type WebsiteMinAggregateInputType = {
    id?: true
    url?: true
    title?: true
    polygonId?: true
  }

  export type WebsiteMaxAggregateInputType = {
    id?: true
    url?: true
    title?: true
    polygonId?: true
  }

  export type WebsiteCountAggregateInputType = {
    id?: true
    url?: true
    title?: true
    polygonId?: true
    _all?: true
  }

  export type WebsiteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Website to aggregate.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: WebsiteOrderByWithRelationInput | WebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Websites
    **/
    _count?: true | WebsiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebsiteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebsiteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebsiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebsiteMaxAggregateInputType
  }

  export type GetWebsiteAggregateType<T extends WebsiteAggregateArgs> = {
        [P in keyof T & keyof AggregateWebsite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebsite[P]>
      : GetScalarType<T[P], AggregateWebsite[P]>
  }




  export type WebsiteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebsiteWhereInput
    orderBy?: WebsiteOrderByWithAggregationInput | WebsiteOrderByWithAggregationInput[]
    by: WebsiteScalarFieldEnum[] | WebsiteScalarFieldEnum
    having?: WebsiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebsiteCountAggregateInputType | true
    _avg?: WebsiteAvgAggregateInputType
    _sum?: WebsiteSumAggregateInputType
    _min?: WebsiteMinAggregateInputType
    _max?: WebsiteMaxAggregateInputType
  }

  export type WebsiteGroupByOutputType = {
    id: number
    url: string
    title: string | null
    polygonId: number
    _count: WebsiteCountAggregateOutputType | null
    _avg: WebsiteAvgAggregateOutputType | null
    _sum: WebsiteSumAggregateOutputType | null
    _min: WebsiteMinAggregateOutputType | null
    _max: WebsiteMaxAggregateOutputType | null
  }

  type GetWebsiteGroupByPayload<T extends WebsiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebsiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebsiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebsiteGroupByOutputType[P]>
            : GetScalarType<T[P], WebsiteGroupByOutputType[P]>
        }
      >
    >


  export type WebsiteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    polygonId?: boolean
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["website"]>

  export type WebsiteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    polygonId?: boolean
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["website"]>

  export type WebsiteSelectScalar = {
    id?: boolean
    url?: boolean
    title?: boolean
    polygonId?: boolean
  }

  export type WebsiteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }
  export type WebsiteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }

  export type $WebsitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Website"
    objects: {
      polygon: Prisma.$PolygonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      url: string
      title: string | null
      polygonId: number
    }, ExtArgs["result"]["website"]>
    composites: {}
  }

  type WebsiteGetPayload<S extends boolean | null | undefined | WebsiteDefaultArgs> = $Result.GetResult<Prisma.$WebsitePayload, S>

  type WebsiteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WebsiteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WebsiteCountAggregateInputType | true
    }

  export interface WebsiteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Website'], meta: { name: 'Website' } }
    /**
     * Find zero or one Website that matches the filter.
     * @param {WebsiteFindUniqueArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebsiteFindUniqueArgs>(args: SelectSubset<T, WebsiteFindUniqueArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Website that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WebsiteFindUniqueOrThrowArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebsiteFindUniqueOrThrowArgs>(args: SelectSubset<T, WebsiteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Website that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindFirstArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebsiteFindFirstArgs>(args?: SelectSubset<T, WebsiteFindFirstArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Website that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindFirstOrThrowArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebsiteFindFirstOrThrowArgs>(args?: SelectSubset<T, WebsiteFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Websites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Websites
     * const websites = await prisma.website.findMany()
     * 
     * // Get first 10 Websites
     * const websites = await prisma.website.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const websiteWithIdOnly = await prisma.website.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebsiteFindManyArgs>(args?: SelectSubset<T, WebsiteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Website.
     * @param {WebsiteCreateArgs} args - Arguments to create a Website.
     * @example
     * // Create one Website
     * const Website = await prisma.website.create({
     *   data: {
     *     // ... data to create a Website
     *   }
     * })
     * 
     */
    create<T extends WebsiteCreateArgs>(args: SelectSubset<T, WebsiteCreateArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Websites.
     * @param {WebsiteCreateManyArgs} args - Arguments to create many Websites.
     * @example
     * // Create many Websites
     * const website = await prisma.website.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebsiteCreateManyArgs>(args?: SelectSubset<T, WebsiteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Websites and returns the data saved in the database.
     * @param {WebsiteCreateManyAndReturnArgs} args - Arguments to create many Websites.
     * @example
     * // Create many Websites
     * const website = await prisma.website.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Websites and only return the `id`
     * const websiteWithIdOnly = await prisma.website.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebsiteCreateManyAndReturnArgs>(args?: SelectSubset<T, WebsiteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Website.
     * @param {WebsiteDeleteArgs} args - Arguments to delete one Website.
     * @example
     * // Delete one Website
     * const Website = await prisma.website.delete({
     *   where: {
     *     // ... filter to delete one Website
     *   }
     * })
     * 
     */
    delete<T extends WebsiteDeleteArgs>(args: SelectSubset<T, WebsiteDeleteArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Website.
     * @param {WebsiteUpdateArgs} args - Arguments to update one Website.
     * @example
     * // Update one Website
     * const website = await prisma.website.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebsiteUpdateArgs>(args: SelectSubset<T, WebsiteUpdateArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Websites.
     * @param {WebsiteDeleteManyArgs} args - Arguments to filter Websites to delete.
     * @example
     * // Delete a few Websites
     * const { count } = await prisma.website.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebsiteDeleteManyArgs>(args?: SelectSubset<T, WebsiteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Websites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Websites
     * const website = await prisma.website.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebsiteUpdateManyArgs>(args: SelectSubset<T, WebsiteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Website.
     * @param {WebsiteUpsertArgs} args - Arguments to update or create a Website.
     * @example
     * // Update or create a Website
     * const website = await prisma.website.upsert({
     *   create: {
     *     // ... data to create a Website
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Website we want to update
     *   }
     * })
     */
    upsert<T extends WebsiteUpsertArgs>(args: SelectSubset<T, WebsiteUpsertArgs<ExtArgs>>): Prisma__WebsiteClient<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Websites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteCountArgs} args - Arguments to filter Websites to count.
     * @example
     * // Count the number of Websites
     * const count = await prisma.website.count({
     *   where: {
     *     // ... the filter for the Websites we want to count
     *   }
     * })
    **/
    count<T extends WebsiteCountArgs>(
      args?: Subset<T, WebsiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebsiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Website.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebsiteAggregateArgs>(args: Subset<T, WebsiteAggregateArgs>): Prisma.PrismaPromise<GetWebsiteAggregateType<T>>

    /**
     * Group by Website.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebsiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebsiteGroupByArgs['orderBy'] }
        : { orderBy?: WebsiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebsiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebsiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Website model
   */
  readonly fields: WebsiteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Website.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebsiteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    polygon<T extends PolygonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PolygonDefaultArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Website model
   */ 
  interface WebsiteFieldRefs {
    readonly id: FieldRef<"Website", 'Int'>
    readonly url: FieldRef<"Website", 'String'>
    readonly title: FieldRef<"Website", 'String'>
    readonly polygonId: FieldRef<"Website", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Website findUnique
   */
  export type WebsiteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where: WebsiteWhereUniqueInput
  }

  /**
   * Website findUniqueOrThrow
   */
  export type WebsiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where: WebsiteWhereUniqueInput
  }

  /**
   * Website findFirst
   */
  export type WebsiteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: WebsiteOrderByWithRelationInput | WebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Websites.
     */
    distinct?: WebsiteScalarFieldEnum | WebsiteScalarFieldEnum[]
  }

  /**
   * Website findFirstOrThrow
   */
  export type WebsiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: WebsiteOrderByWithRelationInput | WebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Websites.
     */
    distinct?: WebsiteScalarFieldEnum | WebsiteScalarFieldEnum[]
  }

  /**
   * Website findMany
   */
  export type WebsiteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter, which Websites to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: WebsiteOrderByWithRelationInput | WebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    distinct?: WebsiteScalarFieldEnum | WebsiteScalarFieldEnum[]
  }

  /**
   * Website create
   */
  export type WebsiteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * The data needed to create a Website.
     */
    data: XOR<WebsiteCreateInput, WebsiteUncheckedCreateInput>
  }

  /**
   * Website createMany
   */
  export type WebsiteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Websites.
     */
    data: WebsiteCreateManyInput | WebsiteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Website createManyAndReturn
   */
  export type WebsiteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Websites.
     */
    data: WebsiteCreateManyInput | WebsiteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Website update
   */
  export type WebsiteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * The data needed to update a Website.
     */
    data: XOR<WebsiteUpdateInput, WebsiteUncheckedUpdateInput>
    /**
     * Choose, which Website to update.
     */
    where: WebsiteWhereUniqueInput
  }

  /**
   * Website updateMany
   */
  export type WebsiteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Websites.
     */
    data: XOR<WebsiteUpdateManyMutationInput, WebsiteUncheckedUpdateManyInput>
    /**
     * Filter which Websites to update
     */
    where?: WebsiteWhereInput
  }

  /**
   * Website upsert
   */
  export type WebsiteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * The filter to search for the Website to update in case it exists.
     */
    where: WebsiteWhereUniqueInput
    /**
     * In case the Website found by the `where` argument doesn't exist, create a new Website with this data.
     */
    create: XOR<WebsiteCreateInput, WebsiteUncheckedCreateInput>
    /**
     * In case the Website was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebsiteUpdateInput, WebsiteUncheckedUpdateInput>
  }

  /**
   * Website delete
   */
  export type WebsiteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter which Website to delete.
     */
    where: WebsiteWhereUniqueInput
  }

  /**
   * Website deleteMany
   */
  export type WebsiteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Websites to delete
     */
    where?: WebsiteWhereInput
  }

  /**
   * Website without action
   */
  export type WebsiteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
  }


  /**
   * Model Change
   */

  export type AggregateChange = {
    _count: ChangeCountAggregateOutputType | null
    _avg: ChangeAvgAggregateOutputType | null
    _sum: ChangeSumAggregateOutputType | null
    _min: ChangeMinAggregateOutputType | null
    _max: ChangeMaxAggregateOutputType | null
  }

  export type ChangeAvgAggregateOutputType = {
    id: number | null
    polygonId: number | null
  }

  export type ChangeSumAggregateOutputType = {
    id: number | null
    polygonId: number | null
  }

  export type ChangeMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    description: string | null
    polygonId: number | null
  }

  export type ChangeMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    description: string | null
    polygonId: number | null
  }

  export type ChangeCountAggregateOutputType = {
    id: number
    createdAt: number
    description: number
    polygonId: number
    _all: number
  }


  export type ChangeAvgAggregateInputType = {
    id?: true
    polygonId?: true
  }

  export type ChangeSumAggregateInputType = {
    id?: true
    polygonId?: true
  }

  export type ChangeMinAggregateInputType = {
    id?: true
    createdAt?: true
    description?: true
    polygonId?: true
  }

  export type ChangeMaxAggregateInputType = {
    id?: true
    createdAt?: true
    description?: true
    polygonId?: true
  }

  export type ChangeCountAggregateInputType = {
    id?: true
    createdAt?: true
    description?: true
    polygonId?: true
    _all?: true
  }

  export type ChangeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Change to aggregate.
     */
    where?: ChangeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Changes to fetch.
     */
    orderBy?: ChangeOrderByWithRelationInput | ChangeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChangeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Changes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Changes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Changes
    **/
    _count?: true | ChangeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChangeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChangeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChangeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChangeMaxAggregateInputType
  }

  export type GetChangeAggregateType<T extends ChangeAggregateArgs> = {
        [P in keyof T & keyof AggregateChange]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChange[P]>
      : GetScalarType<T[P], AggregateChange[P]>
  }




  export type ChangeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChangeWhereInput
    orderBy?: ChangeOrderByWithAggregationInput | ChangeOrderByWithAggregationInput[]
    by: ChangeScalarFieldEnum[] | ChangeScalarFieldEnum
    having?: ChangeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChangeCountAggregateInputType | true
    _avg?: ChangeAvgAggregateInputType
    _sum?: ChangeSumAggregateInputType
    _min?: ChangeMinAggregateInputType
    _max?: ChangeMaxAggregateInputType
  }

  export type ChangeGroupByOutputType = {
    id: number
    createdAt: Date
    description: string | null
    polygonId: number
    _count: ChangeCountAggregateOutputType | null
    _avg: ChangeAvgAggregateOutputType | null
    _sum: ChangeSumAggregateOutputType | null
    _min: ChangeMinAggregateOutputType | null
    _max: ChangeMaxAggregateOutputType | null
  }

  type GetChangeGroupByPayload<T extends ChangeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChangeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChangeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChangeGroupByOutputType[P]>
            : GetScalarType<T[P], ChangeGroupByOutputType[P]>
        }
      >
    >


  export type ChangeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    description?: boolean
    polygonId?: boolean
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["change"]>

  export type ChangeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    description?: boolean
    polygonId?: boolean
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["change"]>

  export type ChangeSelectScalar = {
    id?: boolean
    createdAt?: boolean
    description?: boolean
    polygonId?: boolean
  }

  export type ChangeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }
  export type ChangeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    polygon?: boolean | PolygonDefaultArgs<ExtArgs>
  }

  export type $ChangePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Change"
    objects: {
      polygon: Prisma.$PolygonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      description: string | null
      polygonId: number
    }, ExtArgs["result"]["change"]>
    composites: {}
  }

  type ChangeGetPayload<S extends boolean | null | undefined | ChangeDefaultArgs> = $Result.GetResult<Prisma.$ChangePayload, S>

  type ChangeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ChangeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ChangeCountAggregateInputType | true
    }

  export interface ChangeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Change'], meta: { name: 'Change' } }
    /**
     * Find zero or one Change that matches the filter.
     * @param {ChangeFindUniqueArgs} args - Arguments to find a Change
     * @example
     * // Get one Change
     * const change = await prisma.change.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChangeFindUniqueArgs>(args: SelectSubset<T, ChangeFindUniqueArgs<ExtArgs>>): Prisma__ChangeClient<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Change that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ChangeFindUniqueOrThrowArgs} args - Arguments to find a Change
     * @example
     * // Get one Change
     * const change = await prisma.change.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChangeFindUniqueOrThrowArgs>(args: SelectSubset<T, ChangeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChangeClient<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Change that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeFindFirstArgs} args - Arguments to find a Change
     * @example
     * // Get one Change
     * const change = await prisma.change.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChangeFindFirstArgs>(args?: SelectSubset<T, ChangeFindFirstArgs<ExtArgs>>): Prisma__ChangeClient<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Change that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeFindFirstOrThrowArgs} args - Arguments to find a Change
     * @example
     * // Get one Change
     * const change = await prisma.change.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChangeFindFirstOrThrowArgs>(args?: SelectSubset<T, ChangeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChangeClient<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Changes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Changes
     * const changes = await prisma.change.findMany()
     * 
     * // Get first 10 Changes
     * const changes = await prisma.change.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const changeWithIdOnly = await prisma.change.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChangeFindManyArgs>(args?: SelectSubset<T, ChangeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Change.
     * @param {ChangeCreateArgs} args - Arguments to create a Change.
     * @example
     * // Create one Change
     * const Change = await prisma.change.create({
     *   data: {
     *     // ... data to create a Change
     *   }
     * })
     * 
     */
    create<T extends ChangeCreateArgs>(args: SelectSubset<T, ChangeCreateArgs<ExtArgs>>): Prisma__ChangeClient<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Changes.
     * @param {ChangeCreateManyArgs} args - Arguments to create many Changes.
     * @example
     * // Create many Changes
     * const change = await prisma.change.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChangeCreateManyArgs>(args?: SelectSubset<T, ChangeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Changes and returns the data saved in the database.
     * @param {ChangeCreateManyAndReturnArgs} args - Arguments to create many Changes.
     * @example
     * // Create many Changes
     * const change = await prisma.change.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Changes and only return the `id`
     * const changeWithIdOnly = await prisma.change.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChangeCreateManyAndReturnArgs>(args?: SelectSubset<T, ChangeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Change.
     * @param {ChangeDeleteArgs} args - Arguments to delete one Change.
     * @example
     * // Delete one Change
     * const Change = await prisma.change.delete({
     *   where: {
     *     // ... filter to delete one Change
     *   }
     * })
     * 
     */
    delete<T extends ChangeDeleteArgs>(args: SelectSubset<T, ChangeDeleteArgs<ExtArgs>>): Prisma__ChangeClient<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Change.
     * @param {ChangeUpdateArgs} args - Arguments to update one Change.
     * @example
     * // Update one Change
     * const change = await prisma.change.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChangeUpdateArgs>(args: SelectSubset<T, ChangeUpdateArgs<ExtArgs>>): Prisma__ChangeClient<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Changes.
     * @param {ChangeDeleteManyArgs} args - Arguments to filter Changes to delete.
     * @example
     * // Delete a few Changes
     * const { count } = await prisma.change.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChangeDeleteManyArgs>(args?: SelectSubset<T, ChangeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Changes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Changes
     * const change = await prisma.change.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChangeUpdateManyArgs>(args: SelectSubset<T, ChangeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Change.
     * @param {ChangeUpsertArgs} args - Arguments to update or create a Change.
     * @example
     * // Update or create a Change
     * const change = await prisma.change.upsert({
     *   create: {
     *     // ... data to create a Change
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Change we want to update
     *   }
     * })
     */
    upsert<T extends ChangeUpsertArgs>(args: SelectSubset<T, ChangeUpsertArgs<ExtArgs>>): Prisma__ChangeClient<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Changes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeCountArgs} args - Arguments to filter Changes to count.
     * @example
     * // Count the number of Changes
     * const count = await prisma.change.count({
     *   where: {
     *     // ... the filter for the Changes we want to count
     *   }
     * })
    **/
    count<T extends ChangeCountArgs>(
      args?: Subset<T, ChangeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChangeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Change.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChangeAggregateArgs>(args: Subset<T, ChangeAggregateArgs>): Prisma.PrismaPromise<GetChangeAggregateType<T>>

    /**
     * Group by Change.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChangeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChangeGroupByArgs['orderBy'] }
        : { orderBy?: ChangeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChangeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChangeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Change model
   */
  readonly fields: ChangeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Change.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChangeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    polygon<T extends PolygonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PolygonDefaultArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Change model
   */ 
  interface ChangeFieldRefs {
    readonly id: FieldRef<"Change", 'Int'>
    readonly createdAt: FieldRef<"Change", 'DateTime'>
    readonly description: FieldRef<"Change", 'String'>
    readonly polygonId: FieldRef<"Change", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Change findUnique
   */
  export type ChangeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
    /**
     * Filter, which Change to fetch.
     */
    where: ChangeWhereUniqueInput
  }

  /**
   * Change findUniqueOrThrow
   */
  export type ChangeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
    /**
     * Filter, which Change to fetch.
     */
    where: ChangeWhereUniqueInput
  }

  /**
   * Change findFirst
   */
  export type ChangeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
    /**
     * Filter, which Change to fetch.
     */
    where?: ChangeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Changes to fetch.
     */
    orderBy?: ChangeOrderByWithRelationInput | ChangeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Changes.
     */
    cursor?: ChangeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Changes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Changes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Changes.
     */
    distinct?: ChangeScalarFieldEnum | ChangeScalarFieldEnum[]
  }

  /**
   * Change findFirstOrThrow
   */
  export type ChangeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
    /**
     * Filter, which Change to fetch.
     */
    where?: ChangeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Changes to fetch.
     */
    orderBy?: ChangeOrderByWithRelationInput | ChangeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Changes.
     */
    cursor?: ChangeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Changes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Changes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Changes.
     */
    distinct?: ChangeScalarFieldEnum | ChangeScalarFieldEnum[]
  }

  /**
   * Change findMany
   */
  export type ChangeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
    /**
     * Filter, which Changes to fetch.
     */
    where?: ChangeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Changes to fetch.
     */
    orderBy?: ChangeOrderByWithRelationInput | ChangeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Changes.
     */
    cursor?: ChangeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Changes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Changes.
     */
    skip?: number
    distinct?: ChangeScalarFieldEnum | ChangeScalarFieldEnum[]
  }

  /**
   * Change create
   */
  export type ChangeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
    /**
     * The data needed to create a Change.
     */
    data: XOR<ChangeCreateInput, ChangeUncheckedCreateInput>
  }

  /**
   * Change createMany
   */
  export type ChangeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Changes.
     */
    data: ChangeCreateManyInput | ChangeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Change createManyAndReturn
   */
  export type ChangeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Changes.
     */
    data: ChangeCreateManyInput | ChangeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Change update
   */
  export type ChangeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
    /**
     * The data needed to update a Change.
     */
    data: XOR<ChangeUpdateInput, ChangeUncheckedUpdateInput>
    /**
     * Choose, which Change to update.
     */
    where: ChangeWhereUniqueInput
  }

  /**
   * Change updateMany
   */
  export type ChangeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Changes.
     */
    data: XOR<ChangeUpdateManyMutationInput, ChangeUncheckedUpdateManyInput>
    /**
     * Filter which Changes to update
     */
    where?: ChangeWhereInput
  }

  /**
   * Change upsert
   */
  export type ChangeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
    /**
     * The filter to search for the Change to update in case it exists.
     */
    where: ChangeWhereUniqueInput
    /**
     * In case the Change found by the `where` argument doesn't exist, create a new Change with this data.
     */
    create: XOR<ChangeCreateInput, ChangeUncheckedCreateInput>
    /**
     * In case the Change was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChangeUpdateInput, ChangeUncheckedUpdateInput>
  }

  /**
   * Change delete
   */
  export type ChangeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
    /**
     * Filter which Change to delete.
     */
    where: ChangeWhereUniqueInput
  }

  /**
   * Change deleteMany
   */
  export type ChangeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Changes to delete
     */
    where?: ChangeWhereInput
  }

  /**
   * Change without action
   */
  export type ChangeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
  }


  /**
   * Model Relation
   */

  export type AggregateRelation = {
    _count: RelationCountAggregateOutputType | null
    _avg: RelationAvgAggregateOutputType | null
    _sum: RelationSumAggregateOutputType | null
    _min: RelationMinAggregateOutputType | null
    _max: RelationMaxAggregateOutputType | null
  }

  export type RelationAvgAggregateOutputType = {
    id: number | null
    relatedToId: number | null
    relatedFromId: number | null
  }

  export type RelationSumAggregateOutputType = {
    id: number | null
    relatedToId: number | null
    relatedFromId: number | null
  }

  export type RelationMinAggregateOutputType = {
    id: number | null
    description: string | null
    relatedToId: number | null
    relatedFromId: number | null
  }

  export type RelationMaxAggregateOutputType = {
    id: number | null
    description: string | null
    relatedToId: number | null
    relatedFromId: number | null
  }

  export type RelationCountAggregateOutputType = {
    id: number
    description: number
    relatedToId: number
    relatedFromId: number
    _all: number
  }


  export type RelationAvgAggregateInputType = {
    id?: true
    relatedToId?: true
    relatedFromId?: true
  }

  export type RelationSumAggregateInputType = {
    id?: true
    relatedToId?: true
    relatedFromId?: true
  }

  export type RelationMinAggregateInputType = {
    id?: true
    description?: true
    relatedToId?: true
    relatedFromId?: true
  }

  export type RelationMaxAggregateInputType = {
    id?: true
    description?: true
    relatedToId?: true
    relatedFromId?: true
  }

  export type RelationCountAggregateInputType = {
    id?: true
    description?: true
    relatedToId?: true
    relatedFromId?: true
    _all?: true
  }

  export type RelationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Relation to aggregate.
     */
    where?: RelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relations to fetch.
     */
    orderBy?: RelationOrderByWithRelationInput | RelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Relations
    **/
    _count?: true | RelationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RelationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RelationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RelationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RelationMaxAggregateInputType
  }

  export type GetRelationAggregateType<T extends RelationAggregateArgs> = {
        [P in keyof T & keyof AggregateRelation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRelation[P]>
      : GetScalarType<T[P], AggregateRelation[P]>
  }




  export type RelationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RelationWhereInput
    orderBy?: RelationOrderByWithAggregationInput | RelationOrderByWithAggregationInput[]
    by: RelationScalarFieldEnum[] | RelationScalarFieldEnum
    having?: RelationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RelationCountAggregateInputType | true
    _avg?: RelationAvgAggregateInputType
    _sum?: RelationSumAggregateInputType
    _min?: RelationMinAggregateInputType
    _max?: RelationMaxAggregateInputType
  }

  export type RelationGroupByOutputType = {
    id: number
    description: string | null
    relatedToId: number
    relatedFromId: number
    _count: RelationCountAggregateOutputType | null
    _avg: RelationAvgAggregateOutputType | null
    _sum: RelationSumAggregateOutputType | null
    _min: RelationMinAggregateOutputType | null
    _max: RelationMaxAggregateOutputType | null
  }

  type GetRelationGroupByPayload<T extends RelationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RelationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RelationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RelationGroupByOutputType[P]>
            : GetScalarType<T[P], RelationGroupByOutputType[P]>
        }
      >
    >


  export type RelationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    relatedToId?: boolean
    relatedFromId?: boolean
    relatedTo?: boolean | PolygonDefaultArgs<ExtArgs>
    relatedFrom?: boolean | PolygonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["relation"]>

  export type RelationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    relatedToId?: boolean
    relatedFromId?: boolean
    relatedTo?: boolean | PolygonDefaultArgs<ExtArgs>
    relatedFrom?: boolean | PolygonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["relation"]>

  export type RelationSelectScalar = {
    id?: boolean
    description?: boolean
    relatedToId?: boolean
    relatedFromId?: boolean
  }

  export type RelationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    relatedTo?: boolean | PolygonDefaultArgs<ExtArgs>
    relatedFrom?: boolean | PolygonDefaultArgs<ExtArgs>
  }
  export type RelationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    relatedTo?: boolean | PolygonDefaultArgs<ExtArgs>
    relatedFrom?: boolean | PolygonDefaultArgs<ExtArgs>
  }

  export type $RelationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Relation"
    objects: {
      relatedTo: Prisma.$PolygonPayload<ExtArgs>
      relatedFrom: Prisma.$PolygonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      description: string | null
      relatedToId: number
      relatedFromId: number
    }, ExtArgs["result"]["relation"]>
    composites: {}
  }

  type RelationGetPayload<S extends boolean | null | undefined | RelationDefaultArgs> = $Result.GetResult<Prisma.$RelationPayload, S>

  type RelationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RelationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RelationCountAggregateInputType | true
    }

  export interface RelationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Relation'], meta: { name: 'Relation' } }
    /**
     * Find zero or one Relation that matches the filter.
     * @param {RelationFindUniqueArgs} args - Arguments to find a Relation
     * @example
     * // Get one Relation
     * const relation = await prisma.relation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RelationFindUniqueArgs>(args: SelectSubset<T, RelationFindUniqueArgs<ExtArgs>>): Prisma__RelationClient<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Relation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RelationFindUniqueOrThrowArgs} args - Arguments to find a Relation
     * @example
     * // Get one Relation
     * const relation = await prisma.relation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RelationFindUniqueOrThrowArgs>(args: SelectSubset<T, RelationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RelationClient<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Relation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationFindFirstArgs} args - Arguments to find a Relation
     * @example
     * // Get one Relation
     * const relation = await prisma.relation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RelationFindFirstArgs>(args?: SelectSubset<T, RelationFindFirstArgs<ExtArgs>>): Prisma__RelationClient<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Relation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationFindFirstOrThrowArgs} args - Arguments to find a Relation
     * @example
     * // Get one Relation
     * const relation = await prisma.relation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RelationFindFirstOrThrowArgs>(args?: SelectSubset<T, RelationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RelationClient<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Relations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Relations
     * const relations = await prisma.relation.findMany()
     * 
     * // Get first 10 Relations
     * const relations = await prisma.relation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const relationWithIdOnly = await prisma.relation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RelationFindManyArgs>(args?: SelectSubset<T, RelationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Relation.
     * @param {RelationCreateArgs} args - Arguments to create a Relation.
     * @example
     * // Create one Relation
     * const Relation = await prisma.relation.create({
     *   data: {
     *     // ... data to create a Relation
     *   }
     * })
     * 
     */
    create<T extends RelationCreateArgs>(args: SelectSubset<T, RelationCreateArgs<ExtArgs>>): Prisma__RelationClient<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Relations.
     * @param {RelationCreateManyArgs} args - Arguments to create many Relations.
     * @example
     * // Create many Relations
     * const relation = await prisma.relation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RelationCreateManyArgs>(args?: SelectSubset<T, RelationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Relations and returns the data saved in the database.
     * @param {RelationCreateManyAndReturnArgs} args - Arguments to create many Relations.
     * @example
     * // Create many Relations
     * const relation = await prisma.relation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Relations and only return the `id`
     * const relationWithIdOnly = await prisma.relation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RelationCreateManyAndReturnArgs>(args?: SelectSubset<T, RelationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Relation.
     * @param {RelationDeleteArgs} args - Arguments to delete one Relation.
     * @example
     * // Delete one Relation
     * const Relation = await prisma.relation.delete({
     *   where: {
     *     // ... filter to delete one Relation
     *   }
     * })
     * 
     */
    delete<T extends RelationDeleteArgs>(args: SelectSubset<T, RelationDeleteArgs<ExtArgs>>): Prisma__RelationClient<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Relation.
     * @param {RelationUpdateArgs} args - Arguments to update one Relation.
     * @example
     * // Update one Relation
     * const relation = await prisma.relation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RelationUpdateArgs>(args: SelectSubset<T, RelationUpdateArgs<ExtArgs>>): Prisma__RelationClient<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Relations.
     * @param {RelationDeleteManyArgs} args - Arguments to filter Relations to delete.
     * @example
     * // Delete a few Relations
     * const { count } = await prisma.relation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RelationDeleteManyArgs>(args?: SelectSubset<T, RelationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Relations
     * const relation = await prisma.relation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RelationUpdateManyArgs>(args: SelectSubset<T, RelationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Relation.
     * @param {RelationUpsertArgs} args - Arguments to update or create a Relation.
     * @example
     * // Update or create a Relation
     * const relation = await prisma.relation.upsert({
     *   create: {
     *     // ... data to create a Relation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Relation we want to update
     *   }
     * })
     */
    upsert<T extends RelationUpsertArgs>(args: SelectSubset<T, RelationUpsertArgs<ExtArgs>>): Prisma__RelationClient<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationCountArgs} args - Arguments to filter Relations to count.
     * @example
     * // Count the number of Relations
     * const count = await prisma.relation.count({
     *   where: {
     *     // ... the filter for the Relations we want to count
     *   }
     * })
    **/
    count<T extends RelationCountArgs>(
      args?: Subset<T, RelationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RelationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Relation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RelationAggregateArgs>(args: Subset<T, RelationAggregateArgs>): Prisma.PrismaPromise<GetRelationAggregateType<T>>

    /**
     * Group by Relation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RelationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RelationGroupByArgs['orderBy'] }
        : { orderBy?: RelationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RelationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRelationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Relation model
   */
  readonly fields: RelationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Relation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RelationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    relatedTo<T extends PolygonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PolygonDefaultArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    relatedFrom<T extends PolygonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PolygonDefaultArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Relation model
   */ 
  interface RelationFieldRefs {
    readonly id: FieldRef<"Relation", 'Int'>
    readonly description: FieldRef<"Relation", 'String'>
    readonly relatedToId: FieldRef<"Relation", 'Int'>
    readonly relatedFromId: FieldRef<"Relation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Relation findUnique
   */
  export type RelationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    /**
     * Filter, which Relation to fetch.
     */
    where: RelationWhereUniqueInput
  }

  /**
   * Relation findUniqueOrThrow
   */
  export type RelationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    /**
     * Filter, which Relation to fetch.
     */
    where: RelationWhereUniqueInput
  }

  /**
   * Relation findFirst
   */
  export type RelationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    /**
     * Filter, which Relation to fetch.
     */
    where?: RelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relations to fetch.
     */
    orderBy?: RelationOrderByWithRelationInput | RelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Relations.
     */
    cursor?: RelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Relations.
     */
    distinct?: RelationScalarFieldEnum | RelationScalarFieldEnum[]
  }

  /**
   * Relation findFirstOrThrow
   */
  export type RelationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    /**
     * Filter, which Relation to fetch.
     */
    where?: RelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relations to fetch.
     */
    orderBy?: RelationOrderByWithRelationInput | RelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Relations.
     */
    cursor?: RelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Relations.
     */
    distinct?: RelationScalarFieldEnum | RelationScalarFieldEnum[]
  }

  /**
   * Relation findMany
   */
  export type RelationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    /**
     * Filter, which Relations to fetch.
     */
    where?: RelationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relations to fetch.
     */
    orderBy?: RelationOrderByWithRelationInput | RelationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Relations.
     */
    cursor?: RelationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relations.
     */
    skip?: number
    distinct?: RelationScalarFieldEnum | RelationScalarFieldEnum[]
  }

  /**
   * Relation create
   */
  export type RelationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    /**
     * The data needed to create a Relation.
     */
    data: XOR<RelationCreateInput, RelationUncheckedCreateInput>
  }

  /**
   * Relation createMany
   */
  export type RelationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Relations.
     */
    data: RelationCreateManyInput | RelationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Relation createManyAndReturn
   */
  export type RelationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Relations.
     */
    data: RelationCreateManyInput | RelationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Relation update
   */
  export type RelationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    /**
     * The data needed to update a Relation.
     */
    data: XOR<RelationUpdateInput, RelationUncheckedUpdateInput>
    /**
     * Choose, which Relation to update.
     */
    where: RelationWhereUniqueInput
  }

  /**
   * Relation updateMany
   */
  export type RelationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Relations.
     */
    data: XOR<RelationUpdateManyMutationInput, RelationUncheckedUpdateManyInput>
    /**
     * Filter which Relations to update
     */
    where?: RelationWhereInput
  }

  /**
   * Relation upsert
   */
  export type RelationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    /**
     * The filter to search for the Relation to update in case it exists.
     */
    where: RelationWhereUniqueInput
    /**
     * In case the Relation found by the `where` argument doesn't exist, create a new Relation with this data.
     */
    create: XOR<RelationCreateInput, RelationUncheckedCreateInput>
    /**
     * In case the Relation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RelationUpdateInput, RelationUncheckedUpdateInput>
  }

  /**
   * Relation delete
   */
  export type RelationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    /**
     * Filter which Relation to delete.
     */
    where: RelationWhereUniqueInput
  }

  /**
   * Relation deleteMany
   */
  export type RelationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Relations to delete
     */
    where?: RelationWhereInput
  }

  /**
   * Relation without action
   */
  export type RelationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    email: string | null
    password: string | null
    name: string | null
    organization: string | null
    api_key: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    email: string | null
    password: string | null
    name: string | null
    organization: string | null
    api_key: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    email: number
    password: number
    name: number
    permissions: number
    organization: number
    api_key: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    password?: true
    name?: true
    organization?: true
    api_key?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    password?: true
    name?: true
    organization?: true
    api_key?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    email?: true
    password?: true
    name?: true
    permissions?: true
    organization?: true
    api_key?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    createdAt: Date
    email: string
    password: string
    name: string | null
    permissions: string[]
    organization: string | null
    api_key: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    permissions?: boolean
    organization?: boolean
    api_key?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    permissions?: boolean
    organization?: boolean
    api_key?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    permissions?: boolean
    organization?: boolean
    api_key?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      email: string
      password: string
      name: string | null
      permissions: string[]
      organization: string | null
      api_key: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly permissions: FieldRef<"User", 'String[]'>
    readonly organization: FieldRef<"User", 'String'>
    readonly api_key: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Polygon
   */

  export type AggregatePolygon = {
    _count: PolygonCountAggregateOutputType | null
    _avg: PolygonAvgAggregateOutputType | null
    _sum: PolygonSumAggregateOutputType | null
    _min: PolygonMinAggregateOutputType | null
    _max: PolygonMaxAggregateOutputType | null
  }

  export type PolygonAvgAggregateOutputType = {
    id: number | null
  }

  export type PolygonSumAggregateOutputType = {
    id: number | null
  }

  export type PolygonMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    sources: string | null
    color: string | null
    pronunciation: string | null
    category: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PolygonMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    sources: string | null
    color: string | null
    pronunciation: string | null
    category: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PolygonCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    sources: number
    color: number
    pronunciation: number
    category: number
    published: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PolygonAvgAggregateInputType = {
    id?: true
  }

  export type PolygonSumAggregateInputType = {
    id?: true
  }

  export type PolygonMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    sources?: true
    color?: true
    pronunciation?: true
    category?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PolygonMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    sources?: true
    color?: true
    pronunciation?: true
    category?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PolygonCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    sources?: true
    color?: true
    pronunciation?: true
    category?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PolygonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Polygon to aggregate.
     */
    where?: PolygonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polygons to fetch.
     */
    orderBy?: PolygonOrderByWithRelationInput | PolygonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PolygonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polygons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polygons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Polygons
    **/
    _count?: true | PolygonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PolygonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PolygonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PolygonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PolygonMaxAggregateInputType
  }

  export type GetPolygonAggregateType<T extends PolygonAggregateArgs> = {
        [P in keyof T & keyof AggregatePolygon]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePolygon[P]>
      : GetScalarType<T[P], AggregatePolygon[P]>
  }




  export type PolygonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PolygonWhereInput
    orderBy?: PolygonOrderByWithAggregationInput | PolygonOrderByWithAggregationInput[]
    by: PolygonScalarFieldEnum[] | PolygonScalarFieldEnum
    having?: PolygonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PolygonCountAggregateInputType | true
    _avg?: PolygonAvgAggregateInputType
    _sum?: PolygonSumAggregateInputType
    _min?: PolygonMinAggregateInputType
    _max?: PolygonMaxAggregateInputType
  }

  export type PolygonGroupByOutputType = {
    id: number
    name: string
    slug: string | null
    sources: string | null
    color: string | null
    pronunciation: string | null
    category: string | null
    published: boolean
    createdAt: Date
    updatedAt: Date
    _count: PolygonCountAggregateOutputType | null
    _avg: PolygonAvgAggregateOutputType | null
    _sum: PolygonSumAggregateOutputType | null
    _min: PolygonMinAggregateOutputType | null
    _max: PolygonMaxAggregateOutputType | null
  }

  type GetPolygonGroupByPayload<T extends PolygonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PolygonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PolygonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PolygonGroupByOutputType[P]>
            : GetScalarType<T[P], PolygonGroupByOutputType[P]>
        }
      >
    >


  export type PolygonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    sources?: boolean
    color?: boolean
    pronunciation?: boolean
    category?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    media?: boolean | Polygon$mediaArgs<ExtArgs>
    websites?: boolean | Polygon$websitesArgs<ExtArgs>
    changelog?: boolean | Polygon$changelogArgs<ExtArgs>
    relatedTo?: boolean | Polygon$relatedToArgs<ExtArgs>
    relatedFrom?: boolean | Polygon$relatedFromArgs<ExtArgs>
    _count?: boolean | PolygonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["polygon"]>

  export type PolygonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    sources?: boolean
    color?: boolean
    pronunciation?: boolean
    category?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["polygon"]>

  export type PolygonSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    sources?: boolean
    color?: boolean
    pronunciation?: boolean
    category?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PolygonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | Polygon$mediaArgs<ExtArgs>
    websites?: boolean | Polygon$websitesArgs<ExtArgs>
    changelog?: boolean | Polygon$changelogArgs<ExtArgs>
    relatedTo?: boolean | Polygon$relatedToArgs<ExtArgs>
    relatedFrom?: boolean | Polygon$relatedFromArgs<ExtArgs>
    _count?: boolean | PolygonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PolygonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PolygonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Polygon"
    objects: {
      media: Prisma.$MediaPayload<ExtArgs>[]
      websites: Prisma.$WebsitePayload<ExtArgs>[]
      changelog: Prisma.$ChangePayload<ExtArgs>[]
      relatedTo: Prisma.$RelationPayload<ExtArgs>[]
      relatedFrom: Prisma.$RelationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string | null
      sources: string | null
      color: string | null
      pronunciation: string | null
      category: string | null
      published: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["polygon"]>
    composites: {}
  }

  type PolygonGetPayload<S extends boolean | null | undefined | PolygonDefaultArgs> = $Result.GetResult<Prisma.$PolygonPayload, S>

  type PolygonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PolygonFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PolygonCountAggregateInputType | true
    }

  export interface PolygonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Polygon'], meta: { name: 'Polygon' } }
    /**
     * Find zero or one Polygon that matches the filter.
     * @param {PolygonFindUniqueArgs} args - Arguments to find a Polygon
     * @example
     * // Get one Polygon
     * const polygon = await prisma.polygon.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PolygonFindUniqueArgs>(args: SelectSubset<T, PolygonFindUniqueArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Polygon that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PolygonFindUniqueOrThrowArgs} args - Arguments to find a Polygon
     * @example
     * // Get one Polygon
     * const polygon = await prisma.polygon.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PolygonFindUniqueOrThrowArgs>(args: SelectSubset<T, PolygonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Polygon that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolygonFindFirstArgs} args - Arguments to find a Polygon
     * @example
     * // Get one Polygon
     * const polygon = await prisma.polygon.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PolygonFindFirstArgs>(args?: SelectSubset<T, PolygonFindFirstArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Polygon that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolygonFindFirstOrThrowArgs} args - Arguments to find a Polygon
     * @example
     * // Get one Polygon
     * const polygon = await prisma.polygon.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PolygonFindFirstOrThrowArgs>(args?: SelectSubset<T, PolygonFindFirstOrThrowArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Polygons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolygonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Polygons
     * const polygons = await prisma.polygon.findMany()
     * 
     * // Get first 10 Polygons
     * const polygons = await prisma.polygon.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const polygonWithIdOnly = await prisma.polygon.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PolygonFindManyArgs>(args?: SelectSubset<T, PolygonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Polygon.
     * @param {PolygonCreateArgs} args - Arguments to create a Polygon.
     * @example
     * // Create one Polygon
     * const Polygon = await prisma.polygon.create({
     *   data: {
     *     // ... data to create a Polygon
     *   }
     * })
     * 
     */
    create<T extends PolygonCreateArgs>(args: SelectSubset<T, PolygonCreateArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Polygons.
     * @param {PolygonCreateManyArgs} args - Arguments to create many Polygons.
     * @example
     * // Create many Polygons
     * const polygon = await prisma.polygon.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PolygonCreateManyArgs>(args?: SelectSubset<T, PolygonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Polygons and returns the data saved in the database.
     * @param {PolygonCreateManyAndReturnArgs} args - Arguments to create many Polygons.
     * @example
     * // Create many Polygons
     * const polygon = await prisma.polygon.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Polygons and only return the `id`
     * const polygonWithIdOnly = await prisma.polygon.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PolygonCreateManyAndReturnArgs>(args?: SelectSubset<T, PolygonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Polygon.
     * @param {PolygonDeleteArgs} args - Arguments to delete one Polygon.
     * @example
     * // Delete one Polygon
     * const Polygon = await prisma.polygon.delete({
     *   where: {
     *     // ... filter to delete one Polygon
     *   }
     * })
     * 
     */
    delete<T extends PolygonDeleteArgs>(args: SelectSubset<T, PolygonDeleteArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Polygon.
     * @param {PolygonUpdateArgs} args - Arguments to update one Polygon.
     * @example
     * // Update one Polygon
     * const polygon = await prisma.polygon.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PolygonUpdateArgs>(args: SelectSubset<T, PolygonUpdateArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Polygons.
     * @param {PolygonDeleteManyArgs} args - Arguments to filter Polygons to delete.
     * @example
     * // Delete a few Polygons
     * const { count } = await prisma.polygon.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PolygonDeleteManyArgs>(args?: SelectSubset<T, PolygonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Polygons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolygonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Polygons
     * const polygon = await prisma.polygon.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PolygonUpdateManyArgs>(args: SelectSubset<T, PolygonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Polygon.
     * @param {PolygonUpsertArgs} args - Arguments to update or create a Polygon.
     * @example
     * // Update or create a Polygon
     * const polygon = await prisma.polygon.upsert({
     *   create: {
     *     // ... data to create a Polygon
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Polygon we want to update
     *   }
     * })
     */
    upsert<T extends PolygonUpsertArgs>(args: SelectSubset<T, PolygonUpsertArgs<ExtArgs>>): Prisma__PolygonClient<$Result.GetResult<Prisma.$PolygonPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Polygons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolygonCountArgs} args - Arguments to filter Polygons to count.
     * @example
     * // Count the number of Polygons
     * const count = await prisma.polygon.count({
     *   where: {
     *     // ... the filter for the Polygons we want to count
     *   }
     * })
    **/
    count<T extends PolygonCountArgs>(
      args?: Subset<T, PolygonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PolygonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Polygon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolygonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PolygonAggregateArgs>(args: Subset<T, PolygonAggregateArgs>): Prisma.PrismaPromise<GetPolygonAggregateType<T>>

    /**
     * Group by Polygon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolygonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PolygonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PolygonGroupByArgs['orderBy'] }
        : { orderBy?: PolygonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PolygonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPolygonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Polygon model
   */
  readonly fields: PolygonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Polygon.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PolygonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    media<T extends Polygon$mediaArgs<ExtArgs> = {}>(args?: Subset<T, Polygon$mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany"> | Null>
    websites<T extends Polygon$websitesArgs<ExtArgs> = {}>(args?: Subset<T, Polygon$websitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebsitePayload<ExtArgs>, T, "findMany"> | Null>
    changelog<T extends Polygon$changelogArgs<ExtArgs> = {}>(args?: Subset<T, Polygon$changelogArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangePayload<ExtArgs>, T, "findMany"> | Null>
    relatedTo<T extends Polygon$relatedToArgs<ExtArgs> = {}>(args?: Subset<T, Polygon$relatedToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "findMany"> | Null>
    relatedFrom<T extends Polygon$relatedFromArgs<ExtArgs> = {}>(args?: Subset<T, Polygon$relatedFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Polygon model
   */ 
  interface PolygonFieldRefs {
    readonly id: FieldRef<"Polygon", 'Int'>
    readonly name: FieldRef<"Polygon", 'String'>
    readonly slug: FieldRef<"Polygon", 'String'>
    readonly sources: FieldRef<"Polygon", 'String'>
    readonly color: FieldRef<"Polygon", 'String'>
    readonly pronunciation: FieldRef<"Polygon", 'String'>
    readonly category: FieldRef<"Polygon", 'String'>
    readonly published: FieldRef<"Polygon", 'Boolean'>
    readonly createdAt: FieldRef<"Polygon", 'DateTime'>
    readonly updatedAt: FieldRef<"Polygon", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Polygon findUnique
   */
  export type PolygonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolygonInclude<ExtArgs> | null
    /**
     * Filter, which Polygon to fetch.
     */
    where: PolygonWhereUniqueInput
  }

  /**
   * Polygon findUniqueOrThrow
   */
  export type PolygonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolygonInclude<ExtArgs> | null
    /**
     * Filter, which Polygon to fetch.
     */
    where: PolygonWhereUniqueInput
  }

  /**
   * Polygon findFirst
   */
  export type PolygonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolygonInclude<ExtArgs> | null
    /**
     * Filter, which Polygon to fetch.
     */
    where?: PolygonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polygons to fetch.
     */
    orderBy?: PolygonOrderByWithRelationInput | PolygonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Polygons.
     */
    cursor?: PolygonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polygons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polygons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Polygons.
     */
    distinct?: PolygonScalarFieldEnum | PolygonScalarFieldEnum[]
  }

  /**
   * Polygon findFirstOrThrow
   */
  export type PolygonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolygonInclude<ExtArgs> | null
    /**
     * Filter, which Polygon to fetch.
     */
    where?: PolygonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polygons to fetch.
     */
    orderBy?: PolygonOrderByWithRelationInput | PolygonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Polygons.
     */
    cursor?: PolygonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polygons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polygons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Polygons.
     */
    distinct?: PolygonScalarFieldEnum | PolygonScalarFieldEnum[]
  }

  /**
   * Polygon findMany
   */
  export type PolygonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolygonInclude<ExtArgs> | null
    /**
     * Filter, which Polygons to fetch.
     */
    where?: PolygonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polygons to fetch.
     */
    orderBy?: PolygonOrderByWithRelationInput | PolygonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Polygons.
     */
    cursor?: PolygonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polygons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polygons.
     */
    skip?: number
    distinct?: PolygonScalarFieldEnum | PolygonScalarFieldEnum[]
  }

  /**
   * Polygon create
   */
  export type PolygonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolygonInclude<ExtArgs> | null
    /**
     * The data needed to create a Polygon.
     */
    data: XOR<PolygonCreateInput, PolygonUncheckedCreateInput>
  }

  /**
   * Polygon createMany
   */
  export type PolygonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Polygons.
     */
    data: PolygonCreateManyInput | PolygonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Polygon createManyAndReturn
   */
  export type PolygonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Polygons.
     */
    data: PolygonCreateManyInput | PolygonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Polygon update
   */
  export type PolygonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolygonInclude<ExtArgs> | null
    /**
     * The data needed to update a Polygon.
     */
    data: XOR<PolygonUpdateInput, PolygonUncheckedUpdateInput>
    /**
     * Choose, which Polygon to update.
     */
    where: PolygonWhereUniqueInput
  }

  /**
   * Polygon updateMany
   */
  export type PolygonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Polygons.
     */
    data: XOR<PolygonUpdateManyMutationInput, PolygonUncheckedUpdateManyInput>
    /**
     * Filter which Polygons to update
     */
    where?: PolygonWhereInput
  }

  /**
   * Polygon upsert
   */
  export type PolygonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolygonInclude<ExtArgs> | null
    /**
     * The filter to search for the Polygon to update in case it exists.
     */
    where: PolygonWhereUniqueInput
    /**
     * In case the Polygon found by the `where` argument doesn't exist, create a new Polygon with this data.
     */
    create: XOR<PolygonCreateInput, PolygonUncheckedCreateInput>
    /**
     * In case the Polygon was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PolygonUpdateInput, PolygonUncheckedUpdateInput>
  }

  /**
   * Polygon delete
   */
  export type PolygonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolygonInclude<ExtArgs> | null
    /**
     * Filter which Polygon to delete.
     */
    where: PolygonWhereUniqueInput
  }

  /**
   * Polygon deleteMany
   */
  export type PolygonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Polygons to delete
     */
    where?: PolygonWhereInput
  }

  /**
   * Polygon.media
   */
  export type Polygon$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    cursor?: MediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Polygon.websites
   */
  export type Polygon$websitesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebsiteInclude<ExtArgs> | null
    where?: WebsiteWhereInput
    orderBy?: WebsiteOrderByWithRelationInput | WebsiteOrderByWithRelationInput[]
    cursor?: WebsiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebsiteScalarFieldEnum | WebsiteScalarFieldEnum[]
  }

  /**
   * Polygon.changelog
   */
  export type Polygon$changelogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Change
     */
    select?: ChangeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeInclude<ExtArgs> | null
    where?: ChangeWhereInput
    orderBy?: ChangeOrderByWithRelationInput | ChangeOrderByWithRelationInput[]
    cursor?: ChangeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChangeScalarFieldEnum | ChangeScalarFieldEnum[]
  }

  /**
   * Polygon.relatedTo
   */
  export type Polygon$relatedToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    where?: RelationWhereInput
    orderBy?: RelationOrderByWithRelationInput | RelationOrderByWithRelationInput[]
    cursor?: RelationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RelationScalarFieldEnum | RelationScalarFieldEnum[]
  }

  /**
   * Polygon.relatedFrom
   */
  export type Polygon$relatedFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relation
     */
    select?: RelationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationInclude<ExtArgs> | null
    where?: RelationWhereInput
    orderBy?: RelationOrderByWithRelationInput | RelationOrderByWithRelationInput[]
    cursor?: RelationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RelationScalarFieldEnum | RelationScalarFieldEnum[]
  }

  /**
   * Polygon without action
   */
  export type PolygonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Polygon
     */
    select?: PolygonSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolygonInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const MediaScalarFieldEnum: {
    id: 'id',
    url: 'url',
    title: 'title',
    caption: 'caption',
    polygonId: 'polygonId'
  };

  export type MediaScalarFieldEnum = (typeof MediaScalarFieldEnum)[keyof typeof MediaScalarFieldEnum]


  export const WebsiteScalarFieldEnum: {
    id: 'id',
    url: 'url',
    title: 'title',
    polygonId: 'polygonId'
  };

  export type WebsiteScalarFieldEnum = (typeof WebsiteScalarFieldEnum)[keyof typeof WebsiteScalarFieldEnum]


  export const ChangeScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    description: 'description',
    polygonId: 'polygonId'
  };

  export type ChangeScalarFieldEnum = (typeof ChangeScalarFieldEnum)[keyof typeof ChangeScalarFieldEnum]


  export const RelationScalarFieldEnum: {
    id: 'id',
    description: 'description',
    relatedToId: 'relatedToId',
    relatedFromId: 'relatedFromId'
  };

  export type RelationScalarFieldEnum = (typeof RelationScalarFieldEnum)[keyof typeof RelationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    email: 'email',
    password: 'password',
    name: 'name',
    permissions: 'permissions',
    organization: 'organization',
    api_key: 'api_key'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PolygonScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    sources: 'sources',
    color: 'color',
    pronunciation: 'pronunciation',
    category: 'category',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PolygonScalarFieldEnum = (typeof PolygonScalarFieldEnum)[keyof typeof PolygonScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type MediaWhereInput = {
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    id?: IntFilter<"Media"> | number
    url?: StringFilter<"Media"> | string
    title?: StringNullableFilter<"Media"> | string | null
    caption?: StringNullableFilter<"Media"> | string | null
    polygonId?: IntFilter<"Media"> | number
    polygon?: XOR<PolygonRelationFilter, PolygonWhereInput>
  }

  export type MediaOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrderInput | SortOrder
    caption?: SortOrderInput | SortOrder
    polygonId?: SortOrder
    polygon?: PolygonOrderByWithRelationInput
  }

  export type MediaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    url?: StringFilter<"Media"> | string
    title?: StringNullableFilter<"Media"> | string | null
    caption?: StringNullableFilter<"Media"> | string | null
    polygonId?: IntFilter<"Media"> | number
    polygon?: XOR<PolygonRelationFilter, PolygonWhereInput>
  }, "id">

  export type MediaOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrderInput | SortOrder
    caption?: SortOrderInput | SortOrder
    polygonId?: SortOrder
    _count?: MediaCountOrderByAggregateInput
    _avg?: MediaAvgOrderByAggregateInput
    _max?: MediaMaxOrderByAggregateInput
    _min?: MediaMinOrderByAggregateInput
    _sum?: MediaSumOrderByAggregateInput
  }

  export type MediaScalarWhereWithAggregatesInput = {
    AND?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    OR?: MediaScalarWhereWithAggregatesInput[]
    NOT?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Media"> | number
    url?: StringWithAggregatesFilter<"Media"> | string
    title?: StringNullableWithAggregatesFilter<"Media"> | string | null
    caption?: StringNullableWithAggregatesFilter<"Media"> | string | null
    polygonId?: IntWithAggregatesFilter<"Media"> | number
  }

  export type WebsiteWhereInput = {
    AND?: WebsiteWhereInput | WebsiteWhereInput[]
    OR?: WebsiteWhereInput[]
    NOT?: WebsiteWhereInput | WebsiteWhereInput[]
    id?: IntFilter<"Website"> | number
    url?: StringFilter<"Website"> | string
    title?: StringNullableFilter<"Website"> | string | null
    polygonId?: IntFilter<"Website"> | number
    polygon?: XOR<PolygonRelationFilter, PolygonWhereInput>
  }

  export type WebsiteOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrderInput | SortOrder
    polygonId?: SortOrder
    polygon?: PolygonOrderByWithRelationInput
  }

  export type WebsiteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: WebsiteWhereInput | WebsiteWhereInput[]
    OR?: WebsiteWhereInput[]
    NOT?: WebsiteWhereInput | WebsiteWhereInput[]
    url?: StringFilter<"Website"> | string
    title?: StringNullableFilter<"Website"> | string | null
    polygonId?: IntFilter<"Website"> | number
    polygon?: XOR<PolygonRelationFilter, PolygonWhereInput>
  }, "id">

  export type WebsiteOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrderInput | SortOrder
    polygonId?: SortOrder
    _count?: WebsiteCountOrderByAggregateInput
    _avg?: WebsiteAvgOrderByAggregateInput
    _max?: WebsiteMaxOrderByAggregateInput
    _min?: WebsiteMinOrderByAggregateInput
    _sum?: WebsiteSumOrderByAggregateInput
  }

  export type WebsiteScalarWhereWithAggregatesInput = {
    AND?: WebsiteScalarWhereWithAggregatesInput | WebsiteScalarWhereWithAggregatesInput[]
    OR?: WebsiteScalarWhereWithAggregatesInput[]
    NOT?: WebsiteScalarWhereWithAggregatesInput | WebsiteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Website"> | number
    url?: StringWithAggregatesFilter<"Website"> | string
    title?: StringNullableWithAggregatesFilter<"Website"> | string | null
    polygonId?: IntWithAggregatesFilter<"Website"> | number
  }

  export type ChangeWhereInput = {
    AND?: ChangeWhereInput | ChangeWhereInput[]
    OR?: ChangeWhereInput[]
    NOT?: ChangeWhereInput | ChangeWhereInput[]
    id?: IntFilter<"Change"> | number
    createdAt?: DateTimeFilter<"Change"> | Date | string
    description?: StringNullableFilter<"Change"> | string | null
    polygonId?: IntFilter<"Change"> | number
    polygon?: XOR<PolygonRelationFilter, PolygonWhereInput>
  }

  export type ChangeOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    description?: SortOrderInput | SortOrder
    polygonId?: SortOrder
    polygon?: PolygonOrderByWithRelationInput
  }

  export type ChangeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChangeWhereInput | ChangeWhereInput[]
    OR?: ChangeWhereInput[]
    NOT?: ChangeWhereInput | ChangeWhereInput[]
    createdAt?: DateTimeFilter<"Change"> | Date | string
    description?: StringNullableFilter<"Change"> | string | null
    polygonId?: IntFilter<"Change"> | number
    polygon?: XOR<PolygonRelationFilter, PolygonWhereInput>
  }, "id">

  export type ChangeOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    description?: SortOrderInput | SortOrder
    polygonId?: SortOrder
    _count?: ChangeCountOrderByAggregateInput
    _avg?: ChangeAvgOrderByAggregateInput
    _max?: ChangeMaxOrderByAggregateInput
    _min?: ChangeMinOrderByAggregateInput
    _sum?: ChangeSumOrderByAggregateInput
  }

  export type ChangeScalarWhereWithAggregatesInput = {
    AND?: ChangeScalarWhereWithAggregatesInput | ChangeScalarWhereWithAggregatesInput[]
    OR?: ChangeScalarWhereWithAggregatesInput[]
    NOT?: ChangeScalarWhereWithAggregatesInput | ChangeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Change"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Change"> | Date | string
    description?: StringNullableWithAggregatesFilter<"Change"> | string | null
    polygonId?: IntWithAggregatesFilter<"Change"> | number
  }

  export type RelationWhereInput = {
    AND?: RelationWhereInput | RelationWhereInput[]
    OR?: RelationWhereInput[]
    NOT?: RelationWhereInput | RelationWhereInput[]
    id?: IntFilter<"Relation"> | number
    description?: StringNullableFilter<"Relation"> | string | null
    relatedToId?: IntFilter<"Relation"> | number
    relatedFromId?: IntFilter<"Relation"> | number
    relatedTo?: XOR<PolygonRelationFilter, PolygonWhereInput>
    relatedFrom?: XOR<PolygonRelationFilter, PolygonWhereInput>
  }

  export type RelationOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrderInput | SortOrder
    relatedToId?: SortOrder
    relatedFromId?: SortOrder
    relatedTo?: PolygonOrderByWithRelationInput
    relatedFrom?: PolygonOrderByWithRelationInput
  }

  export type RelationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RelationWhereInput | RelationWhereInput[]
    OR?: RelationWhereInput[]
    NOT?: RelationWhereInput | RelationWhereInput[]
    description?: StringNullableFilter<"Relation"> | string | null
    relatedToId?: IntFilter<"Relation"> | number
    relatedFromId?: IntFilter<"Relation"> | number
    relatedTo?: XOR<PolygonRelationFilter, PolygonWhereInput>
    relatedFrom?: XOR<PolygonRelationFilter, PolygonWhereInput>
  }, "id">

  export type RelationOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrderInput | SortOrder
    relatedToId?: SortOrder
    relatedFromId?: SortOrder
    _count?: RelationCountOrderByAggregateInput
    _avg?: RelationAvgOrderByAggregateInput
    _max?: RelationMaxOrderByAggregateInput
    _min?: RelationMinOrderByAggregateInput
    _sum?: RelationSumOrderByAggregateInput
  }

  export type RelationScalarWhereWithAggregatesInput = {
    AND?: RelationScalarWhereWithAggregatesInput | RelationScalarWhereWithAggregatesInput[]
    OR?: RelationScalarWhereWithAggregatesInput[]
    NOT?: RelationScalarWhereWithAggregatesInput | RelationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Relation"> | number
    description?: StringNullableWithAggregatesFilter<"Relation"> | string | null
    relatedToId?: IntWithAggregatesFilter<"Relation"> | number
    relatedFromId?: IntWithAggregatesFilter<"Relation"> | number
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    permissions?: StringNullableListFilter<"User">
    organization?: StringNullableFilter<"User"> | string | null
    api_key?: StringNullableFilter<"User"> | string | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    permissions?: SortOrder
    organization?: SortOrderInput | SortOrder
    api_key?: SortOrderInput | SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    permissions?: StringNullableListFilter<"User">
    organization?: StringNullableFilter<"User"> | string | null
    api_key?: StringNullableFilter<"User"> | string | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    permissions?: SortOrder
    organization?: SortOrderInput | SortOrder
    api_key?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    permissions?: StringNullableListFilter<"User">
    organization?: StringNullableWithAggregatesFilter<"User"> | string | null
    api_key?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type PolygonWhereInput = {
    AND?: PolygonWhereInput | PolygonWhereInput[]
    OR?: PolygonWhereInput[]
    NOT?: PolygonWhereInput | PolygonWhereInput[]
    id?: IntFilter<"Polygon"> | number
    name?: StringFilter<"Polygon"> | string
    slug?: StringNullableFilter<"Polygon"> | string | null
    sources?: StringNullableFilter<"Polygon"> | string | null
    color?: StringNullableFilter<"Polygon"> | string | null
    pronunciation?: StringNullableFilter<"Polygon"> | string | null
    category?: StringNullableFilter<"Polygon"> | string | null
    published?: BoolFilter<"Polygon"> | boolean
    createdAt?: DateTimeFilter<"Polygon"> | Date | string
    updatedAt?: DateTimeFilter<"Polygon"> | Date | string
    media?: MediaListRelationFilter
    websites?: WebsiteListRelationFilter
    changelog?: ChangeListRelationFilter
    relatedTo?: RelationListRelationFilter
    relatedFrom?: RelationListRelationFilter
  }

  export type PolygonOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrderInput | SortOrder
    sources?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    pronunciation?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    media?: MediaOrderByRelationAggregateInput
    websites?: WebsiteOrderByRelationAggregateInput
    changelog?: ChangeOrderByRelationAggregateInput
    relatedTo?: RelationOrderByRelationAggregateInput
    relatedFrom?: RelationOrderByRelationAggregateInput
  }

  export type PolygonWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: PolygonWhereInput | PolygonWhereInput[]
    OR?: PolygonWhereInput[]
    NOT?: PolygonWhereInput | PolygonWhereInput[]
    name?: StringFilter<"Polygon"> | string
    sources?: StringNullableFilter<"Polygon"> | string | null
    color?: StringNullableFilter<"Polygon"> | string | null
    pronunciation?: StringNullableFilter<"Polygon"> | string | null
    category?: StringNullableFilter<"Polygon"> | string | null
    published?: BoolFilter<"Polygon"> | boolean
    createdAt?: DateTimeFilter<"Polygon"> | Date | string
    updatedAt?: DateTimeFilter<"Polygon"> | Date | string
    media?: MediaListRelationFilter
    websites?: WebsiteListRelationFilter
    changelog?: ChangeListRelationFilter
    relatedTo?: RelationListRelationFilter
    relatedFrom?: RelationListRelationFilter
  }, "id" | "slug">

  export type PolygonOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrderInput | SortOrder
    sources?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    pronunciation?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PolygonCountOrderByAggregateInput
    _avg?: PolygonAvgOrderByAggregateInput
    _max?: PolygonMaxOrderByAggregateInput
    _min?: PolygonMinOrderByAggregateInput
    _sum?: PolygonSumOrderByAggregateInput
  }

  export type PolygonScalarWhereWithAggregatesInput = {
    AND?: PolygonScalarWhereWithAggregatesInput | PolygonScalarWhereWithAggregatesInput[]
    OR?: PolygonScalarWhereWithAggregatesInput[]
    NOT?: PolygonScalarWhereWithAggregatesInput | PolygonScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Polygon"> | number
    name?: StringWithAggregatesFilter<"Polygon"> | string
    slug?: StringNullableWithAggregatesFilter<"Polygon"> | string | null
    sources?: StringNullableWithAggregatesFilter<"Polygon"> | string | null
    color?: StringNullableWithAggregatesFilter<"Polygon"> | string | null
    pronunciation?: StringNullableWithAggregatesFilter<"Polygon"> | string | null
    category?: StringNullableWithAggregatesFilter<"Polygon"> | string | null
    published?: BoolWithAggregatesFilter<"Polygon"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Polygon"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Polygon"> | Date | string
  }

  export type MediaCreateInput = {
    url: string
    title?: string | null
    caption?: string | null
    polygon: PolygonCreateNestedOneWithoutMediaInput
  }

  export type MediaUncheckedCreateInput = {
    id?: number
    url: string
    title?: string | null
    caption?: string | null
    polygonId: number
  }

  export type MediaUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    polygon?: PolygonUpdateOneRequiredWithoutMediaNestedInput
  }

  export type MediaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    polygonId?: IntFieldUpdateOperationsInput | number
  }

  export type MediaCreateManyInput = {
    id?: number
    url: string
    title?: string | null
    caption?: string | null
    polygonId: number
  }

  export type MediaUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MediaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    polygonId?: IntFieldUpdateOperationsInput | number
  }

  export type WebsiteCreateInput = {
    url: string
    title?: string | null
    polygon: PolygonCreateNestedOneWithoutWebsitesInput
  }

  export type WebsiteUncheckedCreateInput = {
    id?: number
    url: string
    title?: string | null
    polygonId: number
  }

  export type WebsiteUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    polygon?: PolygonUpdateOneRequiredWithoutWebsitesNestedInput
  }

  export type WebsiteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    polygonId?: IntFieldUpdateOperationsInput | number
  }

  export type WebsiteCreateManyInput = {
    id?: number
    url: string
    title?: string | null
    polygonId: number
  }

  export type WebsiteUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebsiteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    polygonId?: IntFieldUpdateOperationsInput | number
  }

  export type ChangeCreateInput = {
    createdAt: Date | string
    description?: string | null
    polygon: PolygonCreateNestedOneWithoutChangelogInput
  }

  export type ChangeUncheckedCreateInput = {
    id?: number
    createdAt: Date | string
    description?: string | null
    polygonId: number
  }

  export type ChangeUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    polygon?: PolygonUpdateOneRequiredWithoutChangelogNestedInput
  }

  export type ChangeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    polygonId?: IntFieldUpdateOperationsInput | number
  }

  export type ChangeCreateManyInput = {
    id?: number
    createdAt: Date | string
    description?: string | null
    polygonId: number
  }

  export type ChangeUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChangeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    polygonId?: IntFieldUpdateOperationsInput | number
  }

  export type RelationCreateInput = {
    description?: string | null
    relatedTo: PolygonCreateNestedOneWithoutRelatedFromInput
    relatedFrom: PolygonCreateNestedOneWithoutRelatedToInput
  }

  export type RelationUncheckedCreateInput = {
    id?: number
    description?: string | null
    relatedToId: number
    relatedFromId: number
  }

  export type RelationUpdateInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    relatedTo?: PolygonUpdateOneRequiredWithoutRelatedFromNestedInput
    relatedFrom?: PolygonUpdateOneRequiredWithoutRelatedToNestedInput
  }

  export type RelationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    relatedToId?: IntFieldUpdateOperationsInput | number
    relatedFromId?: IntFieldUpdateOperationsInput | number
  }

  export type RelationCreateManyInput = {
    id?: number
    description?: string | null
    relatedToId: number
    relatedFromId: number
  }

  export type RelationUpdateManyMutationInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RelationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    relatedToId?: IntFieldUpdateOperationsInput | number
    relatedFromId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    createdAt?: Date | string
    email: string
    password: string
    name?: string | null
    permissions?: UserCreatepermissionsInput | string[]
    organization?: string | null
    api_key?: string | null
  }

  export type UserUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    email: string
    password: string
    name?: string | null
    permissions?: UserCreatepermissionsInput | string[]
    organization?: string | null
    api_key?: string | null
  }

  export type UserUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: UserUpdatepermissionsInput | string[]
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    api_key?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: UserUpdatepermissionsInput | string[]
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    api_key?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateManyInput = {
    id?: number
    createdAt?: Date | string
    email: string
    password: string
    name?: string | null
    permissions?: UserCreatepermissionsInput | string[]
    organization?: string | null
    api_key?: string | null
  }

  export type UserUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: UserUpdatepermissionsInput | string[]
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    api_key?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    permissions?: UserUpdatepermissionsInput | string[]
    organization?: NullableStringFieldUpdateOperationsInput | string | null
    api_key?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PolygonCreateInput = {
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaCreateNestedManyWithoutPolygonInput
    websites?: WebsiteCreateNestedManyWithoutPolygonInput
    changelog?: ChangeCreateNestedManyWithoutPolygonInput
    relatedTo?: RelationCreateNestedManyWithoutRelatedFromInput
    relatedFrom?: RelationCreateNestedManyWithoutRelatedToInput
  }

  export type PolygonUncheckedCreateInput = {
    id?: number
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaUncheckedCreateNestedManyWithoutPolygonInput
    websites?: WebsiteUncheckedCreateNestedManyWithoutPolygonInput
    changelog?: ChangeUncheckedCreateNestedManyWithoutPolygonInput
    relatedTo?: RelationUncheckedCreateNestedManyWithoutRelatedFromInput
    relatedFrom?: RelationUncheckedCreateNestedManyWithoutRelatedToInput
  }

  export type PolygonUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUpdateManyWithoutPolygonNestedInput
    websites?: WebsiteUpdateManyWithoutPolygonNestedInput
    changelog?: ChangeUpdateManyWithoutPolygonNestedInput
    relatedTo?: RelationUpdateManyWithoutRelatedFromNestedInput
    relatedFrom?: RelationUpdateManyWithoutRelatedToNestedInput
  }

  export type PolygonUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUncheckedUpdateManyWithoutPolygonNestedInput
    websites?: WebsiteUncheckedUpdateManyWithoutPolygonNestedInput
    changelog?: ChangeUncheckedUpdateManyWithoutPolygonNestedInput
    relatedTo?: RelationUncheckedUpdateManyWithoutRelatedFromNestedInput
    relatedFrom?: RelationUncheckedUpdateManyWithoutRelatedToNestedInput
  }

  export type PolygonCreateManyInput = {
    id?: number
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PolygonUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolygonUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PolygonRelationFilter = {
    is?: PolygonWhereInput
    isNot?: PolygonWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MediaCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    caption?: SortOrder
    polygonId?: SortOrder
  }

  export type MediaAvgOrderByAggregateInput = {
    id?: SortOrder
    polygonId?: SortOrder
  }

  export type MediaMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    caption?: SortOrder
    polygonId?: SortOrder
  }

  export type MediaMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    caption?: SortOrder
    polygonId?: SortOrder
  }

  export type MediaSumOrderByAggregateInput = {
    id?: SortOrder
    polygonId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type WebsiteCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    polygonId?: SortOrder
  }

  export type WebsiteAvgOrderByAggregateInput = {
    id?: SortOrder
    polygonId?: SortOrder
  }

  export type WebsiteMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    polygonId?: SortOrder
  }

  export type WebsiteMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    polygonId?: SortOrder
  }

  export type WebsiteSumOrderByAggregateInput = {
    id?: SortOrder
    polygonId?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ChangeCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    description?: SortOrder
    polygonId?: SortOrder
  }

  export type ChangeAvgOrderByAggregateInput = {
    id?: SortOrder
    polygonId?: SortOrder
  }

  export type ChangeMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    description?: SortOrder
    polygonId?: SortOrder
  }

  export type ChangeMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    description?: SortOrder
    polygonId?: SortOrder
  }

  export type ChangeSumOrderByAggregateInput = {
    id?: SortOrder
    polygonId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type RelationCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    relatedToId?: SortOrder
    relatedFromId?: SortOrder
  }

  export type RelationAvgOrderByAggregateInput = {
    id?: SortOrder
    relatedToId?: SortOrder
    relatedFromId?: SortOrder
  }

  export type RelationMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    relatedToId?: SortOrder
    relatedFromId?: SortOrder
  }

  export type RelationMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    relatedToId?: SortOrder
    relatedFromId?: SortOrder
  }

  export type RelationSumOrderByAggregateInput = {
    id?: SortOrder
    relatedToId?: SortOrder
    relatedFromId?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    permissions?: SortOrder
    organization?: SortOrder
    api_key?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    organization?: SortOrder
    api_key?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    organization?: SortOrder
    api_key?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MediaListRelationFilter = {
    every?: MediaWhereInput
    some?: MediaWhereInput
    none?: MediaWhereInput
  }

  export type WebsiteListRelationFilter = {
    every?: WebsiteWhereInput
    some?: WebsiteWhereInput
    none?: WebsiteWhereInput
  }

  export type ChangeListRelationFilter = {
    every?: ChangeWhereInput
    some?: ChangeWhereInput
    none?: ChangeWhereInput
  }

  export type RelationListRelationFilter = {
    every?: RelationWhereInput
    some?: RelationWhereInput
    none?: RelationWhereInput
  }

  export type MediaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebsiteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChangeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RelationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PolygonCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    sources?: SortOrder
    color?: SortOrder
    pronunciation?: SortOrder
    category?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PolygonAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PolygonMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    sources?: SortOrder
    color?: SortOrder
    pronunciation?: SortOrder
    category?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PolygonMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    sources?: SortOrder
    color?: SortOrder
    pronunciation?: SortOrder
    category?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PolygonSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PolygonCreateNestedOneWithoutMediaInput = {
    create?: XOR<PolygonCreateWithoutMediaInput, PolygonUncheckedCreateWithoutMediaInput>
    connectOrCreate?: PolygonCreateOrConnectWithoutMediaInput
    connect?: PolygonWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PolygonUpdateOneRequiredWithoutMediaNestedInput = {
    create?: XOR<PolygonCreateWithoutMediaInput, PolygonUncheckedCreateWithoutMediaInput>
    connectOrCreate?: PolygonCreateOrConnectWithoutMediaInput
    upsert?: PolygonUpsertWithoutMediaInput
    connect?: PolygonWhereUniqueInput
    update?: XOR<XOR<PolygonUpdateToOneWithWhereWithoutMediaInput, PolygonUpdateWithoutMediaInput>, PolygonUncheckedUpdateWithoutMediaInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PolygonCreateNestedOneWithoutWebsitesInput = {
    create?: XOR<PolygonCreateWithoutWebsitesInput, PolygonUncheckedCreateWithoutWebsitesInput>
    connectOrCreate?: PolygonCreateOrConnectWithoutWebsitesInput
    connect?: PolygonWhereUniqueInput
  }

  export type PolygonUpdateOneRequiredWithoutWebsitesNestedInput = {
    create?: XOR<PolygonCreateWithoutWebsitesInput, PolygonUncheckedCreateWithoutWebsitesInput>
    connectOrCreate?: PolygonCreateOrConnectWithoutWebsitesInput
    upsert?: PolygonUpsertWithoutWebsitesInput
    connect?: PolygonWhereUniqueInput
    update?: XOR<XOR<PolygonUpdateToOneWithWhereWithoutWebsitesInput, PolygonUpdateWithoutWebsitesInput>, PolygonUncheckedUpdateWithoutWebsitesInput>
  }

  export type PolygonCreateNestedOneWithoutChangelogInput = {
    create?: XOR<PolygonCreateWithoutChangelogInput, PolygonUncheckedCreateWithoutChangelogInput>
    connectOrCreate?: PolygonCreateOrConnectWithoutChangelogInput
    connect?: PolygonWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PolygonUpdateOneRequiredWithoutChangelogNestedInput = {
    create?: XOR<PolygonCreateWithoutChangelogInput, PolygonUncheckedCreateWithoutChangelogInput>
    connectOrCreate?: PolygonCreateOrConnectWithoutChangelogInput
    upsert?: PolygonUpsertWithoutChangelogInput
    connect?: PolygonWhereUniqueInput
    update?: XOR<XOR<PolygonUpdateToOneWithWhereWithoutChangelogInput, PolygonUpdateWithoutChangelogInput>, PolygonUncheckedUpdateWithoutChangelogInput>
  }

  export type PolygonCreateNestedOneWithoutRelatedFromInput = {
    create?: XOR<PolygonCreateWithoutRelatedFromInput, PolygonUncheckedCreateWithoutRelatedFromInput>
    connectOrCreate?: PolygonCreateOrConnectWithoutRelatedFromInput
    connect?: PolygonWhereUniqueInput
  }

  export type PolygonCreateNestedOneWithoutRelatedToInput = {
    create?: XOR<PolygonCreateWithoutRelatedToInput, PolygonUncheckedCreateWithoutRelatedToInput>
    connectOrCreate?: PolygonCreateOrConnectWithoutRelatedToInput
    connect?: PolygonWhereUniqueInput
  }

  export type PolygonUpdateOneRequiredWithoutRelatedFromNestedInput = {
    create?: XOR<PolygonCreateWithoutRelatedFromInput, PolygonUncheckedCreateWithoutRelatedFromInput>
    connectOrCreate?: PolygonCreateOrConnectWithoutRelatedFromInput
    upsert?: PolygonUpsertWithoutRelatedFromInput
    connect?: PolygonWhereUniqueInput
    update?: XOR<XOR<PolygonUpdateToOneWithWhereWithoutRelatedFromInput, PolygonUpdateWithoutRelatedFromInput>, PolygonUncheckedUpdateWithoutRelatedFromInput>
  }

  export type PolygonUpdateOneRequiredWithoutRelatedToNestedInput = {
    create?: XOR<PolygonCreateWithoutRelatedToInput, PolygonUncheckedCreateWithoutRelatedToInput>
    connectOrCreate?: PolygonCreateOrConnectWithoutRelatedToInput
    upsert?: PolygonUpsertWithoutRelatedToInput
    connect?: PolygonWhereUniqueInput
    update?: XOR<XOR<PolygonUpdateToOneWithWhereWithoutRelatedToInput, PolygonUpdateWithoutRelatedToInput>, PolygonUncheckedUpdateWithoutRelatedToInput>
  }

  export type UserCreatepermissionsInput = {
    set: string[]
  }

  export type UserUpdatepermissionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MediaCreateNestedManyWithoutPolygonInput = {
    create?: XOR<MediaCreateWithoutPolygonInput, MediaUncheckedCreateWithoutPolygonInput> | MediaCreateWithoutPolygonInput[] | MediaUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutPolygonInput | MediaCreateOrConnectWithoutPolygonInput[]
    createMany?: MediaCreateManyPolygonInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type WebsiteCreateNestedManyWithoutPolygonInput = {
    create?: XOR<WebsiteCreateWithoutPolygonInput, WebsiteUncheckedCreateWithoutPolygonInput> | WebsiteCreateWithoutPolygonInput[] | WebsiteUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: WebsiteCreateOrConnectWithoutPolygonInput | WebsiteCreateOrConnectWithoutPolygonInput[]
    createMany?: WebsiteCreateManyPolygonInputEnvelope
    connect?: WebsiteWhereUniqueInput | WebsiteWhereUniqueInput[]
  }

  export type ChangeCreateNestedManyWithoutPolygonInput = {
    create?: XOR<ChangeCreateWithoutPolygonInput, ChangeUncheckedCreateWithoutPolygonInput> | ChangeCreateWithoutPolygonInput[] | ChangeUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: ChangeCreateOrConnectWithoutPolygonInput | ChangeCreateOrConnectWithoutPolygonInput[]
    createMany?: ChangeCreateManyPolygonInputEnvelope
    connect?: ChangeWhereUniqueInput | ChangeWhereUniqueInput[]
  }

  export type RelationCreateNestedManyWithoutRelatedFromInput = {
    create?: XOR<RelationCreateWithoutRelatedFromInput, RelationUncheckedCreateWithoutRelatedFromInput> | RelationCreateWithoutRelatedFromInput[] | RelationUncheckedCreateWithoutRelatedFromInput[]
    connectOrCreate?: RelationCreateOrConnectWithoutRelatedFromInput | RelationCreateOrConnectWithoutRelatedFromInput[]
    createMany?: RelationCreateManyRelatedFromInputEnvelope
    connect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
  }

  export type RelationCreateNestedManyWithoutRelatedToInput = {
    create?: XOR<RelationCreateWithoutRelatedToInput, RelationUncheckedCreateWithoutRelatedToInput> | RelationCreateWithoutRelatedToInput[] | RelationUncheckedCreateWithoutRelatedToInput[]
    connectOrCreate?: RelationCreateOrConnectWithoutRelatedToInput | RelationCreateOrConnectWithoutRelatedToInput[]
    createMany?: RelationCreateManyRelatedToInputEnvelope
    connect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
  }

  export type MediaUncheckedCreateNestedManyWithoutPolygonInput = {
    create?: XOR<MediaCreateWithoutPolygonInput, MediaUncheckedCreateWithoutPolygonInput> | MediaCreateWithoutPolygonInput[] | MediaUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutPolygonInput | MediaCreateOrConnectWithoutPolygonInput[]
    createMany?: MediaCreateManyPolygonInputEnvelope
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
  }

  export type WebsiteUncheckedCreateNestedManyWithoutPolygonInput = {
    create?: XOR<WebsiteCreateWithoutPolygonInput, WebsiteUncheckedCreateWithoutPolygonInput> | WebsiteCreateWithoutPolygonInput[] | WebsiteUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: WebsiteCreateOrConnectWithoutPolygonInput | WebsiteCreateOrConnectWithoutPolygonInput[]
    createMany?: WebsiteCreateManyPolygonInputEnvelope
    connect?: WebsiteWhereUniqueInput | WebsiteWhereUniqueInput[]
  }

  export type ChangeUncheckedCreateNestedManyWithoutPolygonInput = {
    create?: XOR<ChangeCreateWithoutPolygonInput, ChangeUncheckedCreateWithoutPolygonInput> | ChangeCreateWithoutPolygonInput[] | ChangeUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: ChangeCreateOrConnectWithoutPolygonInput | ChangeCreateOrConnectWithoutPolygonInput[]
    createMany?: ChangeCreateManyPolygonInputEnvelope
    connect?: ChangeWhereUniqueInput | ChangeWhereUniqueInput[]
  }

  export type RelationUncheckedCreateNestedManyWithoutRelatedFromInput = {
    create?: XOR<RelationCreateWithoutRelatedFromInput, RelationUncheckedCreateWithoutRelatedFromInput> | RelationCreateWithoutRelatedFromInput[] | RelationUncheckedCreateWithoutRelatedFromInput[]
    connectOrCreate?: RelationCreateOrConnectWithoutRelatedFromInput | RelationCreateOrConnectWithoutRelatedFromInput[]
    createMany?: RelationCreateManyRelatedFromInputEnvelope
    connect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
  }

  export type RelationUncheckedCreateNestedManyWithoutRelatedToInput = {
    create?: XOR<RelationCreateWithoutRelatedToInput, RelationUncheckedCreateWithoutRelatedToInput> | RelationCreateWithoutRelatedToInput[] | RelationUncheckedCreateWithoutRelatedToInput[]
    connectOrCreate?: RelationCreateOrConnectWithoutRelatedToInput | RelationCreateOrConnectWithoutRelatedToInput[]
    createMany?: RelationCreateManyRelatedToInputEnvelope
    connect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MediaUpdateManyWithoutPolygonNestedInput = {
    create?: XOR<MediaCreateWithoutPolygonInput, MediaUncheckedCreateWithoutPolygonInput> | MediaCreateWithoutPolygonInput[] | MediaUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutPolygonInput | MediaCreateOrConnectWithoutPolygonInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutPolygonInput | MediaUpsertWithWhereUniqueWithoutPolygonInput[]
    createMany?: MediaCreateManyPolygonInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutPolygonInput | MediaUpdateWithWhereUniqueWithoutPolygonInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutPolygonInput | MediaUpdateManyWithWhereWithoutPolygonInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type WebsiteUpdateManyWithoutPolygonNestedInput = {
    create?: XOR<WebsiteCreateWithoutPolygonInput, WebsiteUncheckedCreateWithoutPolygonInput> | WebsiteCreateWithoutPolygonInput[] | WebsiteUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: WebsiteCreateOrConnectWithoutPolygonInput | WebsiteCreateOrConnectWithoutPolygonInput[]
    upsert?: WebsiteUpsertWithWhereUniqueWithoutPolygonInput | WebsiteUpsertWithWhereUniqueWithoutPolygonInput[]
    createMany?: WebsiteCreateManyPolygonInputEnvelope
    set?: WebsiteWhereUniqueInput | WebsiteWhereUniqueInput[]
    disconnect?: WebsiteWhereUniqueInput | WebsiteWhereUniqueInput[]
    delete?: WebsiteWhereUniqueInput | WebsiteWhereUniqueInput[]
    connect?: WebsiteWhereUniqueInput | WebsiteWhereUniqueInput[]
    update?: WebsiteUpdateWithWhereUniqueWithoutPolygonInput | WebsiteUpdateWithWhereUniqueWithoutPolygonInput[]
    updateMany?: WebsiteUpdateManyWithWhereWithoutPolygonInput | WebsiteUpdateManyWithWhereWithoutPolygonInput[]
    deleteMany?: WebsiteScalarWhereInput | WebsiteScalarWhereInput[]
  }

  export type ChangeUpdateManyWithoutPolygonNestedInput = {
    create?: XOR<ChangeCreateWithoutPolygonInput, ChangeUncheckedCreateWithoutPolygonInput> | ChangeCreateWithoutPolygonInput[] | ChangeUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: ChangeCreateOrConnectWithoutPolygonInput | ChangeCreateOrConnectWithoutPolygonInput[]
    upsert?: ChangeUpsertWithWhereUniqueWithoutPolygonInput | ChangeUpsertWithWhereUniqueWithoutPolygonInput[]
    createMany?: ChangeCreateManyPolygonInputEnvelope
    set?: ChangeWhereUniqueInput | ChangeWhereUniqueInput[]
    disconnect?: ChangeWhereUniqueInput | ChangeWhereUniqueInput[]
    delete?: ChangeWhereUniqueInput | ChangeWhereUniqueInput[]
    connect?: ChangeWhereUniqueInput | ChangeWhereUniqueInput[]
    update?: ChangeUpdateWithWhereUniqueWithoutPolygonInput | ChangeUpdateWithWhereUniqueWithoutPolygonInput[]
    updateMany?: ChangeUpdateManyWithWhereWithoutPolygonInput | ChangeUpdateManyWithWhereWithoutPolygonInput[]
    deleteMany?: ChangeScalarWhereInput | ChangeScalarWhereInput[]
  }

  export type RelationUpdateManyWithoutRelatedFromNestedInput = {
    create?: XOR<RelationCreateWithoutRelatedFromInput, RelationUncheckedCreateWithoutRelatedFromInput> | RelationCreateWithoutRelatedFromInput[] | RelationUncheckedCreateWithoutRelatedFromInput[]
    connectOrCreate?: RelationCreateOrConnectWithoutRelatedFromInput | RelationCreateOrConnectWithoutRelatedFromInput[]
    upsert?: RelationUpsertWithWhereUniqueWithoutRelatedFromInput | RelationUpsertWithWhereUniqueWithoutRelatedFromInput[]
    createMany?: RelationCreateManyRelatedFromInputEnvelope
    set?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    disconnect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    delete?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    connect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    update?: RelationUpdateWithWhereUniqueWithoutRelatedFromInput | RelationUpdateWithWhereUniqueWithoutRelatedFromInput[]
    updateMany?: RelationUpdateManyWithWhereWithoutRelatedFromInput | RelationUpdateManyWithWhereWithoutRelatedFromInput[]
    deleteMany?: RelationScalarWhereInput | RelationScalarWhereInput[]
  }

  export type RelationUpdateManyWithoutRelatedToNestedInput = {
    create?: XOR<RelationCreateWithoutRelatedToInput, RelationUncheckedCreateWithoutRelatedToInput> | RelationCreateWithoutRelatedToInput[] | RelationUncheckedCreateWithoutRelatedToInput[]
    connectOrCreate?: RelationCreateOrConnectWithoutRelatedToInput | RelationCreateOrConnectWithoutRelatedToInput[]
    upsert?: RelationUpsertWithWhereUniqueWithoutRelatedToInput | RelationUpsertWithWhereUniqueWithoutRelatedToInput[]
    createMany?: RelationCreateManyRelatedToInputEnvelope
    set?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    disconnect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    delete?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    connect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    update?: RelationUpdateWithWhereUniqueWithoutRelatedToInput | RelationUpdateWithWhereUniqueWithoutRelatedToInput[]
    updateMany?: RelationUpdateManyWithWhereWithoutRelatedToInput | RelationUpdateManyWithWhereWithoutRelatedToInput[]
    deleteMany?: RelationScalarWhereInput | RelationScalarWhereInput[]
  }

  export type MediaUncheckedUpdateManyWithoutPolygonNestedInput = {
    create?: XOR<MediaCreateWithoutPolygonInput, MediaUncheckedCreateWithoutPolygonInput> | MediaCreateWithoutPolygonInput[] | MediaUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: MediaCreateOrConnectWithoutPolygonInput | MediaCreateOrConnectWithoutPolygonInput[]
    upsert?: MediaUpsertWithWhereUniqueWithoutPolygonInput | MediaUpsertWithWhereUniqueWithoutPolygonInput[]
    createMany?: MediaCreateManyPolygonInputEnvelope
    set?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    disconnect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    delete?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    connect?: MediaWhereUniqueInput | MediaWhereUniqueInput[]
    update?: MediaUpdateWithWhereUniqueWithoutPolygonInput | MediaUpdateWithWhereUniqueWithoutPolygonInput[]
    updateMany?: MediaUpdateManyWithWhereWithoutPolygonInput | MediaUpdateManyWithWhereWithoutPolygonInput[]
    deleteMany?: MediaScalarWhereInput | MediaScalarWhereInput[]
  }

  export type WebsiteUncheckedUpdateManyWithoutPolygonNestedInput = {
    create?: XOR<WebsiteCreateWithoutPolygonInput, WebsiteUncheckedCreateWithoutPolygonInput> | WebsiteCreateWithoutPolygonInput[] | WebsiteUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: WebsiteCreateOrConnectWithoutPolygonInput | WebsiteCreateOrConnectWithoutPolygonInput[]
    upsert?: WebsiteUpsertWithWhereUniqueWithoutPolygonInput | WebsiteUpsertWithWhereUniqueWithoutPolygonInput[]
    createMany?: WebsiteCreateManyPolygonInputEnvelope
    set?: WebsiteWhereUniqueInput | WebsiteWhereUniqueInput[]
    disconnect?: WebsiteWhereUniqueInput | WebsiteWhereUniqueInput[]
    delete?: WebsiteWhereUniqueInput | WebsiteWhereUniqueInput[]
    connect?: WebsiteWhereUniqueInput | WebsiteWhereUniqueInput[]
    update?: WebsiteUpdateWithWhereUniqueWithoutPolygonInput | WebsiteUpdateWithWhereUniqueWithoutPolygonInput[]
    updateMany?: WebsiteUpdateManyWithWhereWithoutPolygonInput | WebsiteUpdateManyWithWhereWithoutPolygonInput[]
    deleteMany?: WebsiteScalarWhereInput | WebsiteScalarWhereInput[]
  }

  export type ChangeUncheckedUpdateManyWithoutPolygonNestedInput = {
    create?: XOR<ChangeCreateWithoutPolygonInput, ChangeUncheckedCreateWithoutPolygonInput> | ChangeCreateWithoutPolygonInput[] | ChangeUncheckedCreateWithoutPolygonInput[]
    connectOrCreate?: ChangeCreateOrConnectWithoutPolygonInput | ChangeCreateOrConnectWithoutPolygonInput[]
    upsert?: ChangeUpsertWithWhereUniqueWithoutPolygonInput | ChangeUpsertWithWhereUniqueWithoutPolygonInput[]
    createMany?: ChangeCreateManyPolygonInputEnvelope
    set?: ChangeWhereUniqueInput | ChangeWhereUniqueInput[]
    disconnect?: ChangeWhereUniqueInput | ChangeWhereUniqueInput[]
    delete?: ChangeWhereUniqueInput | ChangeWhereUniqueInput[]
    connect?: ChangeWhereUniqueInput | ChangeWhereUniqueInput[]
    update?: ChangeUpdateWithWhereUniqueWithoutPolygonInput | ChangeUpdateWithWhereUniqueWithoutPolygonInput[]
    updateMany?: ChangeUpdateManyWithWhereWithoutPolygonInput | ChangeUpdateManyWithWhereWithoutPolygonInput[]
    deleteMany?: ChangeScalarWhereInput | ChangeScalarWhereInput[]
  }

  export type RelationUncheckedUpdateManyWithoutRelatedFromNestedInput = {
    create?: XOR<RelationCreateWithoutRelatedFromInput, RelationUncheckedCreateWithoutRelatedFromInput> | RelationCreateWithoutRelatedFromInput[] | RelationUncheckedCreateWithoutRelatedFromInput[]
    connectOrCreate?: RelationCreateOrConnectWithoutRelatedFromInput | RelationCreateOrConnectWithoutRelatedFromInput[]
    upsert?: RelationUpsertWithWhereUniqueWithoutRelatedFromInput | RelationUpsertWithWhereUniqueWithoutRelatedFromInput[]
    createMany?: RelationCreateManyRelatedFromInputEnvelope
    set?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    disconnect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    delete?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    connect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    update?: RelationUpdateWithWhereUniqueWithoutRelatedFromInput | RelationUpdateWithWhereUniqueWithoutRelatedFromInput[]
    updateMany?: RelationUpdateManyWithWhereWithoutRelatedFromInput | RelationUpdateManyWithWhereWithoutRelatedFromInput[]
    deleteMany?: RelationScalarWhereInput | RelationScalarWhereInput[]
  }

  export type RelationUncheckedUpdateManyWithoutRelatedToNestedInput = {
    create?: XOR<RelationCreateWithoutRelatedToInput, RelationUncheckedCreateWithoutRelatedToInput> | RelationCreateWithoutRelatedToInput[] | RelationUncheckedCreateWithoutRelatedToInput[]
    connectOrCreate?: RelationCreateOrConnectWithoutRelatedToInput | RelationCreateOrConnectWithoutRelatedToInput[]
    upsert?: RelationUpsertWithWhereUniqueWithoutRelatedToInput | RelationUpsertWithWhereUniqueWithoutRelatedToInput[]
    createMany?: RelationCreateManyRelatedToInputEnvelope
    set?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    disconnect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    delete?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    connect?: RelationWhereUniqueInput | RelationWhereUniqueInput[]
    update?: RelationUpdateWithWhereUniqueWithoutRelatedToInput | RelationUpdateWithWhereUniqueWithoutRelatedToInput[]
    updateMany?: RelationUpdateManyWithWhereWithoutRelatedToInput | RelationUpdateManyWithWhereWithoutRelatedToInput[]
    deleteMany?: RelationScalarWhereInput | RelationScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PolygonCreateWithoutMediaInput = {
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    websites?: WebsiteCreateNestedManyWithoutPolygonInput
    changelog?: ChangeCreateNestedManyWithoutPolygonInput
    relatedTo?: RelationCreateNestedManyWithoutRelatedFromInput
    relatedFrom?: RelationCreateNestedManyWithoutRelatedToInput
  }

  export type PolygonUncheckedCreateWithoutMediaInput = {
    id?: number
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    websites?: WebsiteUncheckedCreateNestedManyWithoutPolygonInput
    changelog?: ChangeUncheckedCreateNestedManyWithoutPolygonInput
    relatedTo?: RelationUncheckedCreateNestedManyWithoutRelatedFromInput
    relatedFrom?: RelationUncheckedCreateNestedManyWithoutRelatedToInput
  }

  export type PolygonCreateOrConnectWithoutMediaInput = {
    where: PolygonWhereUniqueInput
    create: XOR<PolygonCreateWithoutMediaInput, PolygonUncheckedCreateWithoutMediaInput>
  }

  export type PolygonUpsertWithoutMediaInput = {
    update: XOR<PolygonUpdateWithoutMediaInput, PolygonUncheckedUpdateWithoutMediaInput>
    create: XOR<PolygonCreateWithoutMediaInput, PolygonUncheckedCreateWithoutMediaInput>
    where?: PolygonWhereInput
  }

  export type PolygonUpdateToOneWithWhereWithoutMediaInput = {
    where?: PolygonWhereInput
    data: XOR<PolygonUpdateWithoutMediaInput, PolygonUncheckedUpdateWithoutMediaInput>
  }

  export type PolygonUpdateWithoutMediaInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websites?: WebsiteUpdateManyWithoutPolygonNestedInput
    changelog?: ChangeUpdateManyWithoutPolygonNestedInput
    relatedTo?: RelationUpdateManyWithoutRelatedFromNestedInput
    relatedFrom?: RelationUpdateManyWithoutRelatedToNestedInput
  }

  export type PolygonUncheckedUpdateWithoutMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websites?: WebsiteUncheckedUpdateManyWithoutPolygonNestedInput
    changelog?: ChangeUncheckedUpdateManyWithoutPolygonNestedInput
    relatedTo?: RelationUncheckedUpdateManyWithoutRelatedFromNestedInput
    relatedFrom?: RelationUncheckedUpdateManyWithoutRelatedToNestedInput
  }

  export type PolygonCreateWithoutWebsitesInput = {
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaCreateNestedManyWithoutPolygonInput
    changelog?: ChangeCreateNestedManyWithoutPolygonInput
    relatedTo?: RelationCreateNestedManyWithoutRelatedFromInput
    relatedFrom?: RelationCreateNestedManyWithoutRelatedToInput
  }

  export type PolygonUncheckedCreateWithoutWebsitesInput = {
    id?: number
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaUncheckedCreateNestedManyWithoutPolygonInput
    changelog?: ChangeUncheckedCreateNestedManyWithoutPolygonInput
    relatedTo?: RelationUncheckedCreateNestedManyWithoutRelatedFromInput
    relatedFrom?: RelationUncheckedCreateNestedManyWithoutRelatedToInput
  }

  export type PolygonCreateOrConnectWithoutWebsitesInput = {
    where: PolygonWhereUniqueInput
    create: XOR<PolygonCreateWithoutWebsitesInput, PolygonUncheckedCreateWithoutWebsitesInput>
  }

  export type PolygonUpsertWithoutWebsitesInput = {
    update: XOR<PolygonUpdateWithoutWebsitesInput, PolygonUncheckedUpdateWithoutWebsitesInput>
    create: XOR<PolygonCreateWithoutWebsitesInput, PolygonUncheckedCreateWithoutWebsitesInput>
    where?: PolygonWhereInput
  }

  export type PolygonUpdateToOneWithWhereWithoutWebsitesInput = {
    where?: PolygonWhereInput
    data: XOR<PolygonUpdateWithoutWebsitesInput, PolygonUncheckedUpdateWithoutWebsitesInput>
  }

  export type PolygonUpdateWithoutWebsitesInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUpdateManyWithoutPolygonNestedInput
    changelog?: ChangeUpdateManyWithoutPolygonNestedInput
    relatedTo?: RelationUpdateManyWithoutRelatedFromNestedInput
    relatedFrom?: RelationUpdateManyWithoutRelatedToNestedInput
  }

  export type PolygonUncheckedUpdateWithoutWebsitesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUncheckedUpdateManyWithoutPolygonNestedInput
    changelog?: ChangeUncheckedUpdateManyWithoutPolygonNestedInput
    relatedTo?: RelationUncheckedUpdateManyWithoutRelatedFromNestedInput
    relatedFrom?: RelationUncheckedUpdateManyWithoutRelatedToNestedInput
  }

  export type PolygonCreateWithoutChangelogInput = {
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaCreateNestedManyWithoutPolygonInput
    websites?: WebsiteCreateNestedManyWithoutPolygonInput
    relatedTo?: RelationCreateNestedManyWithoutRelatedFromInput
    relatedFrom?: RelationCreateNestedManyWithoutRelatedToInput
  }

  export type PolygonUncheckedCreateWithoutChangelogInput = {
    id?: number
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaUncheckedCreateNestedManyWithoutPolygonInput
    websites?: WebsiteUncheckedCreateNestedManyWithoutPolygonInput
    relatedTo?: RelationUncheckedCreateNestedManyWithoutRelatedFromInput
    relatedFrom?: RelationUncheckedCreateNestedManyWithoutRelatedToInput
  }

  export type PolygonCreateOrConnectWithoutChangelogInput = {
    where: PolygonWhereUniqueInput
    create: XOR<PolygonCreateWithoutChangelogInput, PolygonUncheckedCreateWithoutChangelogInput>
  }

  export type PolygonUpsertWithoutChangelogInput = {
    update: XOR<PolygonUpdateWithoutChangelogInput, PolygonUncheckedUpdateWithoutChangelogInput>
    create: XOR<PolygonCreateWithoutChangelogInput, PolygonUncheckedCreateWithoutChangelogInput>
    where?: PolygonWhereInput
  }

  export type PolygonUpdateToOneWithWhereWithoutChangelogInput = {
    where?: PolygonWhereInput
    data: XOR<PolygonUpdateWithoutChangelogInput, PolygonUncheckedUpdateWithoutChangelogInput>
  }

  export type PolygonUpdateWithoutChangelogInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUpdateManyWithoutPolygonNestedInput
    websites?: WebsiteUpdateManyWithoutPolygonNestedInput
    relatedTo?: RelationUpdateManyWithoutRelatedFromNestedInput
    relatedFrom?: RelationUpdateManyWithoutRelatedToNestedInput
  }

  export type PolygonUncheckedUpdateWithoutChangelogInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUncheckedUpdateManyWithoutPolygonNestedInput
    websites?: WebsiteUncheckedUpdateManyWithoutPolygonNestedInput
    relatedTo?: RelationUncheckedUpdateManyWithoutRelatedFromNestedInput
    relatedFrom?: RelationUncheckedUpdateManyWithoutRelatedToNestedInput
  }

  export type PolygonCreateWithoutRelatedFromInput = {
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaCreateNestedManyWithoutPolygonInput
    websites?: WebsiteCreateNestedManyWithoutPolygonInput
    changelog?: ChangeCreateNestedManyWithoutPolygonInput
    relatedTo?: RelationCreateNestedManyWithoutRelatedFromInput
  }

  export type PolygonUncheckedCreateWithoutRelatedFromInput = {
    id?: number
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaUncheckedCreateNestedManyWithoutPolygonInput
    websites?: WebsiteUncheckedCreateNestedManyWithoutPolygonInput
    changelog?: ChangeUncheckedCreateNestedManyWithoutPolygonInput
    relatedTo?: RelationUncheckedCreateNestedManyWithoutRelatedFromInput
  }

  export type PolygonCreateOrConnectWithoutRelatedFromInput = {
    where: PolygonWhereUniqueInput
    create: XOR<PolygonCreateWithoutRelatedFromInput, PolygonUncheckedCreateWithoutRelatedFromInput>
  }

  export type PolygonCreateWithoutRelatedToInput = {
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaCreateNestedManyWithoutPolygonInput
    websites?: WebsiteCreateNestedManyWithoutPolygonInput
    changelog?: ChangeCreateNestedManyWithoutPolygonInput
    relatedFrom?: RelationCreateNestedManyWithoutRelatedToInput
  }

  export type PolygonUncheckedCreateWithoutRelatedToInput = {
    id?: number
    name: string
    slug?: string | null
    sources?: string | null
    color?: string | null
    pronunciation?: string | null
    category?: string | null
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaUncheckedCreateNestedManyWithoutPolygonInput
    websites?: WebsiteUncheckedCreateNestedManyWithoutPolygonInput
    changelog?: ChangeUncheckedCreateNestedManyWithoutPolygonInput
    relatedFrom?: RelationUncheckedCreateNestedManyWithoutRelatedToInput
  }

  export type PolygonCreateOrConnectWithoutRelatedToInput = {
    where: PolygonWhereUniqueInput
    create: XOR<PolygonCreateWithoutRelatedToInput, PolygonUncheckedCreateWithoutRelatedToInput>
  }

  export type PolygonUpsertWithoutRelatedFromInput = {
    update: XOR<PolygonUpdateWithoutRelatedFromInput, PolygonUncheckedUpdateWithoutRelatedFromInput>
    create: XOR<PolygonCreateWithoutRelatedFromInput, PolygonUncheckedCreateWithoutRelatedFromInput>
    where?: PolygonWhereInput
  }

  export type PolygonUpdateToOneWithWhereWithoutRelatedFromInput = {
    where?: PolygonWhereInput
    data: XOR<PolygonUpdateWithoutRelatedFromInput, PolygonUncheckedUpdateWithoutRelatedFromInput>
  }

  export type PolygonUpdateWithoutRelatedFromInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUpdateManyWithoutPolygonNestedInput
    websites?: WebsiteUpdateManyWithoutPolygonNestedInput
    changelog?: ChangeUpdateManyWithoutPolygonNestedInput
    relatedTo?: RelationUpdateManyWithoutRelatedFromNestedInput
  }

  export type PolygonUncheckedUpdateWithoutRelatedFromInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUncheckedUpdateManyWithoutPolygonNestedInput
    websites?: WebsiteUncheckedUpdateManyWithoutPolygonNestedInput
    changelog?: ChangeUncheckedUpdateManyWithoutPolygonNestedInput
    relatedTo?: RelationUncheckedUpdateManyWithoutRelatedFromNestedInput
  }

  export type PolygonUpsertWithoutRelatedToInput = {
    update: XOR<PolygonUpdateWithoutRelatedToInput, PolygonUncheckedUpdateWithoutRelatedToInput>
    create: XOR<PolygonCreateWithoutRelatedToInput, PolygonUncheckedCreateWithoutRelatedToInput>
    where?: PolygonWhereInput
  }

  export type PolygonUpdateToOneWithWhereWithoutRelatedToInput = {
    where?: PolygonWhereInput
    data: XOR<PolygonUpdateWithoutRelatedToInput, PolygonUncheckedUpdateWithoutRelatedToInput>
  }

  export type PolygonUpdateWithoutRelatedToInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUpdateManyWithoutPolygonNestedInput
    websites?: WebsiteUpdateManyWithoutPolygonNestedInput
    changelog?: ChangeUpdateManyWithoutPolygonNestedInput
    relatedFrom?: RelationUpdateManyWithoutRelatedToNestedInput
  }

  export type PolygonUncheckedUpdateWithoutRelatedToInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    sources?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    pronunciation?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUncheckedUpdateManyWithoutPolygonNestedInput
    websites?: WebsiteUncheckedUpdateManyWithoutPolygonNestedInput
    changelog?: ChangeUncheckedUpdateManyWithoutPolygonNestedInput
    relatedFrom?: RelationUncheckedUpdateManyWithoutRelatedToNestedInput
  }

  export type MediaCreateWithoutPolygonInput = {
    url: string
    title?: string | null
    caption?: string | null
  }

  export type MediaUncheckedCreateWithoutPolygonInput = {
    id?: number
    url: string
    title?: string | null
    caption?: string | null
  }

  export type MediaCreateOrConnectWithoutPolygonInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutPolygonInput, MediaUncheckedCreateWithoutPolygonInput>
  }

  export type MediaCreateManyPolygonInputEnvelope = {
    data: MediaCreateManyPolygonInput | MediaCreateManyPolygonInput[]
    skipDuplicates?: boolean
  }

  export type WebsiteCreateWithoutPolygonInput = {
    url: string
    title?: string | null
  }

  export type WebsiteUncheckedCreateWithoutPolygonInput = {
    id?: number
    url: string
    title?: string | null
  }

  export type WebsiteCreateOrConnectWithoutPolygonInput = {
    where: WebsiteWhereUniqueInput
    create: XOR<WebsiteCreateWithoutPolygonInput, WebsiteUncheckedCreateWithoutPolygonInput>
  }

  export type WebsiteCreateManyPolygonInputEnvelope = {
    data: WebsiteCreateManyPolygonInput | WebsiteCreateManyPolygonInput[]
    skipDuplicates?: boolean
  }

  export type ChangeCreateWithoutPolygonInput = {
    createdAt: Date | string
    description?: string | null
  }

  export type ChangeUncheckedCreateWithoutPolygonInput = {
    id?: number
    createdAt: Date | string
    description?: string | null
  }

  export type ChangeCreateOrConnectWithoutPolygonInput = {
    where: ChangeWhereUniqueInput
    create: XOR<ChangeCreateWithoutPolygonInput, ChangeUncheckedCreateWithoutPolygonInput>
  }

  export type ChangeCreateManyPolygonInputEnvelope = {
    data: ChangeCreateManyPolygonInput | ChangeCreateManyPolygonInput[]
    skipDuplicates?: boolean
  }

  export type RelationCreateWithoutRelatedFromInput = {
    description?: string | null
    relatedTo: PolygonCreateNestedOneWithoutRelatedFromInput
  }

  export type RelationUncheckedCreateWithoutRelatedFromInput = {
    id?: number
    description?: string | null
    relatedToId: number
  }

  export type RelationCreateOrConnectWithoutRelatedFromInput = {
    where: RelationWhereUniqueInput
    create: XOR<RelationCreateWithoutRelatedFromInput, RelationUncheckedCreateWithoutRelatedFromInput>
  }

  export type RelationCreateManyRelatedFromInputEnvelope = {
    data: RelationCreateManyRelatedFromInput | RelationCreateManyRelatedFromInput[]
    skipDuplicates?: boolean
  }

  export type RelationCreateWithoutRelatedToInput = {
    description?: string | null
    relatedFrom: PolygonCreateNestedOneWithoutRelatedToInput
  }

  export type RelationUncheckedCreateWithoutRelatedToInput = {
    id?: number
    description?: string | null
    relatedFromId: number
  }

  export type RelationCreateOrConnectWithoutRelatedToInput = {
    where: RelationWhereUniqueInput
    create: XOR<RelationCreateWithoutRelatedToInput, RelationUncheckedCreateWithoutRelatedToInput>
  }

  export type RelationCreateManyRelatedToInputEnvelope = {
    data: RelationCreateManyRelatedToInput | RelationCreateManyRelatedToInput[]
    skipDuplicates?: boolean
  }

  export type MediaUpsertWithWhereUniqueWithoutPolygonInput = {
    where: MediaWhereUniqueInput
    update: XOR<MediaUpdateWithoutPolygonInput, MediaUncheckedUpdateWithoutPolygonInput>
    create: XOR<MediaCreateWithoutPolygonInput, MediaUncheckedCreateWithoutPolygonInput>
  }

  export type MediaUpdateWithWhereUniqueWithoutPolygonInput = {
    where: MediaWhereUniqueInput
    data: XOR<MediaUpdateWithoutPolygonInput, MediaUncheckedUpdateWithoutPolygonInput>
  }

  export type MediaUpdateManyWithWhereWithoutPolygonInput = {
    where: MediaScalarWhereInput
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyWithoutPolygonInput>
  }

  export type MediaScalarWhereInput = {
    AND?: MediaScalarWhereInput | MediaScalarWhereInput[]
    OR?: MediaScalarWhereInput[]
    NOT?: MediaScalarWhereInput | MediaScalarWhereInput[]
    id?: IntFilter<"Media"> | number
    url?: StringFilter<"Media"> | string
    title?: StringNullableFilter<"Media"> | string | null
    caption?: StringNullableFilter<"Media"> | string | null
    polygonId?: IntFilter<"Media"> | number
  }

  export type WebsiteUpsertWithWhereUniqueWithoutPolygonInput = {
    where: WebsiteWhereUniqueInput
    update: XOR<WebsiteUpdateWithoutPolygonInput, WebsiteUncheckedUpdateWithoutPolygonInput>
    create: XOR<WebsiteCreateWithoutPolygonInput, WebsiteUncheckedCreateWithoutPolygonInput>
  }

  export type WebsiteUpdateWithWhereUniqueWithoutPolygonInput = {
    where: WebsiteWhereUniqueInput
    data: XOR<WebsiteUpdateWithoutPolygonInput, WebsiteUncheckedUpdateWithoutPolygonInput>
  }

  export type WebsiteUpdateManyWithWhereWithoutPolygonInput = {
    where: WebsiteScalarWhereInput
    data: XOR<WebsiteUpdateManyMutationInput, WebsiteUncheckedUpdateManyWithoutPolygonInput>
  }

  export type WebsiteScalarWhereInput = {
    AND?: WebsiteScalarWhereInput | WebsiteScalarWhereInput[]
    OR?: WebsiteScalarWhereInput[]
    NOT?: WebsiteScalarWhereInput | WebsiteScalarWhereInput[]
    id?: IntFilter<"Website"> | number
    url?: StringFilter<"Website"> | string
    title?: StringNullableFilter<"Website"> | string | null
    polygonId?: IntFilter<"Website"> | number
  }

  export type ChangeUpsertWithWhereUniqueWithoutPolygonInput = {
    where: ChangeWhereUniqueInput
    update: XOR<ChangeUpdateWithoutPolygonInput, ChangeUncheckedUpdateWithoutPolygonInput>
    create: XOR<ChangeCreateWithoutPolygonInput, ChangeUncheckedCreateWithoutPolygonInput>
  }

  export type ChangeUpdateWithWhereUniqueWithoutPolygonInput = {
    where: ChangeWhereUniqueInput
    data: XOR<ChangeUpdateWithoutPolygonInput, ChangeUncheckedUpdateWithoutPolygonInput>
  }

  export type ChangeUpdateManyWithWhereWithoutPolygonInput = {
    where: ChangeScalarWhereInput
    data: XOR<ChangeUpdateManyMutationInput, ChangeUncheckedUpdateManyWithoutPolygonInput>
  }

  export type ChangeScalarWhereInput = {
    AND?: ChangeScalarWhereInput | ChangeScalarWhereInput[]
    OR?: ChangeScalarWhereInput[]
    NOT?: ChangeScalarWhereInput | ChangeScalarWhereInput[]
    id?: IntFilter<"Change"> | number
    createdAt?: DateTimeFilter<"Change"> | Date | string
    description?: StringNullableFilter<"Change"> | string | null
    polygonId?: IntFilter<"Change"> | number
  }

  export type RelationUpsertWithWhereUniqueWithoutRelatedFromInput = {
    where: RelationWhereUniqueInput
    update: XOR<RelationUpdateWithoutRelatedFromInput, RelationUncheckedUpdateWithoutRelatedFromInput>
    create: XOR<RelationCreateWithoutRelatedFromInput, RelationUncheckedCreateWithoutRelatedFromInput>
  }

  export type RelationUpdateWithWhereUniqueWithoutRelatedFromInput = {
    where: RelationWhereUniqueInput
    data: XOR<RelationUpdateWithoutRelatedFromInput, RelationUncheckedUpdateWithoutRelatedFromInput>
  }

  export type RelationUpdateManyWithWhereWithoutRelatedFromInput = {
    where: RelationScalarWhereInput
    data: XOR<RelationUpdateManyMutationInput, RelationUncheckedUpdateManyWithoutRelatedFromInput>
  }

  export type RelationScalarWhereInput = {
    AND?: RelationScalarWhereInput | RelationScalarWhereInput[]
    OR?: RelationScalarWhereInput[]
    NOT?: RelationScalarWhereInput | RelationScalarWhereInput[]
    id?: IntFilter<"Relation"> | number
    description?: StringNullableFilter<"Relation"> | string | null
    relatedToId?: IntFilter<"Relation"> | number
    relatedFromId?: IntFilter<"Relation"> | number
  }

  export type RelationUpsertWithWhereUniqueWithoutRelatedToInput = {
    where: RelationWhereUniqueInput
    update: XOR<RelationUpdateWithoutRelatedToInput, RelationUncheckedUpdateWithoutRelatedToInput>
    create: XOR<RelationCreateWithoutRelatedToInput, RelationUncheckedCreateWithoutRelatedToInput>
  }

  export type RelationUpdateWithWhereUniqueWithoutRelatedToInput = {
    where: RelationWhereUniqueInput
    data: XOR<RelationUpdateWithoutRelatedToInput, RelationUncheckedUpdateWithoutRelatedToInput>
  }

  export type RelationUpdateManyWithWhereWithoutRelatedToInput = {
    where: RelationScalarWhereInput
    data: XOR<RelationUpdateManyMutationInput, RelationUncheckedUpdateManyWithoutRelatedToInput>
  }

  export type MediaCreateManyPolygonInput = {
    id?: number
    url: string
    title?: string | null
    caption?: string | null
  }

  export type WebsiteCreateManyPolygonInput = {
    id?: number
    url: string
    title?: string | null
  }

  export type ChangeCreateManyPolygonInput = {
    id?: number
    createdAt: Date | string
    description?: string | null
  }

  export type RelationCreateManyRelatedFromInput = {
    id?: number
    description?: string | null
    relatedToId: number
  }

  export type RelationCreateManyRelatedToInput = {
    id?: number
    description?: string | null
    relatedFromId: number
  }

  export type MediaUpdateWithoutPolygonInput = {
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MediaUncheckedUpdateWithoutPolygonInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MediaUncheckedUpdateManyWithoutPolygonInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebsiteUpdateWithoutPolygonInput = {
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebsiteUncheckedUpdateWithoutPolygonInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebsiteUncheckedUpdateManyWithoutPolygonInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChangeUpdateWithoutPolygonInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChangeUncheckedUpdateWithoutPolygonInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChangeUncheckedUpdateManyWithoutPolygonInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RelationUpdateWithoutRelatedFromInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    relatedTo?: PolygonUpdateOneRequiredWithoutRelatedFromNestedInput
  }

  export type RelationUncheckedUpdateWithoutRelatedFromInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    relatedToId?: IntFieldUpdateOperationsInput | number
  }

  export type RelationUncheckedUpdateManyWithoutRelatedFromInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    relatedToId?: IntFieldUpdateOperationsInput | number
  }

  export type RelationUpdateWithoutRelatedToInput = {
    description?: NullableStringFieldUpdateOperationsInput | string | null
    relatedFrom?: PolygonUpdateOneRequiredWithoutRelatedToNestedInput
  }

  export type RelationUncheckedUpdateWithoutRelatedToInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    relatedFromId?: IntFieldUpdateOperationsInput | number
  }

  export type RelationUncheckedUpdateManyWithoutRelatedToInput = {
    id?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    relatedFromId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PolygonCountOutputTypeDefaultArgs instead
     */
    export type PolygonCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PolygonCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MediaDefaultArgs instead
     */
    export type MediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MediaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WebsiteDefaultArgs instead
     */
    export type WebsiteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WebsiteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ChangeDefaultArgs instead
     */
    export type ChangeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ChangeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RelationDefaultArgs instead
     */
    export type RelationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RelationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PolygonDefaultArgs instead
     */
    export type PolygonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PolygonDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}