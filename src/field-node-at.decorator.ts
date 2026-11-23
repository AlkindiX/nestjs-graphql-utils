import { getFieldNode } from "@alkindix/graphql-utils";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { FieldNode } from "graphql";

export const FieldNodeAt = (path: string | string[] = []) => {
  return createParamDecorator(
    (path: string | string[], context: ExecutionContext): FieldNode => {
      const ctx = GqlExecutionContext.create(context);
      const info = ctx.getInfo();
      return getFieldNode(info, path);
    }
  )(path);
};
