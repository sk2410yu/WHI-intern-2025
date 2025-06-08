import * as t from "io-ts";

export const EmployeeT = t.type({
  id: t.string,
  name: t.string,
  age: t.number,
  affiliation: t.string,
  post: t.string,
});

export type Employee = t.TypeOf<typeof EmployeeT>;
