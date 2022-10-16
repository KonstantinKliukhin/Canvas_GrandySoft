/* eslint-disable @typescript-eslint/no-explicit-any */
export type argumentsOfFnInInterface<Interface extends object, FnName extends keyof Interface> = Interface[FnName] extends (
  ...args: any[]
) => any
  ? Parameters<Interface[FnName]>
  : never;



export type firstArgumentOfFnInInterface<Interface extends object, FnName extends keyof Interface> = Interface[FnName] extends (
  ...args: any[]
) => any
  ? Parameters<Interface[FnName]>[0]
  : never;
