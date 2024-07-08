// src/schema.ts
import fs from "node:fs"
import path from "node:path"
import gql from "graphql-tag"

const schema = fs.readFileSync(path.resolve(__dirname,'../schema.graphql'),"utf8");
export const typeDefs = gql(schema);