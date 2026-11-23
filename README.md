# nestjs-graphql-utils

![License: MIT](https://img.shields.io/github/license/AlkindiX/nestjs-graphql-utils)
[![NPM Release](https://img.shields.io/npm/v/@alkindix/nestjs-graphql-utils)](https://www.npmjs.com/package/@alkindix/nestjs-graphql-utils)
[![NPM Downloads](https://img.shields.io/npm/dw/@alkindix/nestjs-graphql-utils)](https://www.npmjs.com/package/@alkindix/nestjs-graphql-utils)
[![NPM Type Definitions](https://img.shields.io/npm/types/@alkindix/nestjs-graphql-utils)](https://www.npmjs.com/package/@alkindix/nestjs-graphql-utils)

`@alkindix/nestjs-graphql-utils` is a collection of utilities and decorators built on top of [`@alkindix/graphql-utils`](https://www.npmjs.com/package/@alkindix/graphql-utils) to encourage the stateless nature of NestJS GraphQL resolvers and simplify the usage of helpers.

- [nestjs-graphql-utils](#nestjs-graphql-utils)
  - [Documentation](#documentation)
  - [Installation](#installation)
  - [Getting Started](#getting-started)

## Documentation

The full documentation with live code sandboxes can be found [here](https://jenyus-org.github.io/graphql-utils/).

## Installation

`@alkindix/nestjs-graphql-utils` can be installed from NPM by running one of the following commands:

NPM:

```bash
npm i --save @alkindix/nestjs-graphql-utils
```

Yarn:

```bash
yarn add @alkindix/nestjs-graphql-utils
```

This will install `@alkindix/nestjs-graphql-utils` and its dependencies. NestJS and GraphQL are peer dependencies and are taken from your project:

| Peer dependency   | Supported versions |
| ----------------- | ------------------ |
| `@nestjs/common`  | 8.x – 12.x         |
| `@nestjs/graphql` | 10.x – 14.x        |
| `graphql`         | 15.x – 17.x        |

> NestJS 12 is ESM-only; using it with this package requires Node.js 20.19+ or 22.12+.

## Getting Started

Typically, you will want to use the NestJS GraphQL-Utils package and its decorators to optimize your SQL `SELECT` and `JOIN` statements. You can use the `@Selections()` decorator and [wildcards](https://jenyus-org.github.io/graphql-utils/docs/recipes/resolving-selections) to get the precise fields and relations to populate:

```ts
import { Selections } from "@alkindix/nestjs-graphql-utils";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { UserObject } from "../users/dto/user.object";
import { UsersService } from "../users/users.service";
import { PostObject } from "./dto/post.object";
import { Post } from "./entities/post.entity";
import { PostsService } from "./posts.service";

@Resolver(() => PostObject)
class PostsResolver {
  constructor(private postsService: PostsService, private usersService: UsersService) {}

  @Query(() => [PostObject])
  posts(
    @Selections("posts", ["**.**"])
    relations: string[],
    @Selections("posts", ["*."]) fields: string[]
  ) {
    return await this.postsService.findAll({ relations, fields });
  }

  @ResolveField(() => UserObject)
  async author(@Parent() post: Post) {
    if (post.author) {
      return post.author;
    }
    return await this.usersService.findOne({ postId: post.id });
  }
}
```
