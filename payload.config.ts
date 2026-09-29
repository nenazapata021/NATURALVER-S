import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { Products } from "./src/collections/Products";
import { Categories } from "./src/collections/Categories";
import { Orders } from "./src/collections/Orders";
import { Customers } from "./src/collections/Customers";
import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  editor: lexicalEditor(),
  collections: [Products, Categories, Orders, Customers, Users, Media],
  typescript: {
    outputFile: "./src/payload-types.ts",
  },
});
