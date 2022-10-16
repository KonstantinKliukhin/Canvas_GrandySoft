/* eslint-disable @typescript-eslint/no-explicit-any */
export type firstArgOfFnInInterface<
  Interface extends object,
  FnName extends keyof Interface,
> = Interface[FnName] extends (...args: any[]) => any ? Parameters<Interface[FnName]>[0] : never;
