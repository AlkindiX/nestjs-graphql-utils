import { resolveFields } from "@alkindix/graphql-utils";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const Fields = (
  deep: boolean = true,
  parent: string | string[] = []
) => {
  return createParamDecorator(
    (
      { deep, parent }: { deep: boolean; parent: string | string[] },
      context: ExecutionContext
    ): string[] => {
      const ctx = GqlExecutionContext.create(context);
      const info = ctx.getInfo();
      return resolveFields(info, deep, parent);
    }
  )({ deep, parent });
};
