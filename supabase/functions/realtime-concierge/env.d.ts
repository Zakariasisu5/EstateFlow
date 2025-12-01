declare const Deno: any;

declare module "https://deno.land/std@0.208.0/http/server.ts" {
  export function serve(handler?: any): any;
}
