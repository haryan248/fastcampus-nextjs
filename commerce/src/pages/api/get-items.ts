// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: "secret_TrQNgXGKrwfwOo4pen73TyrFtD0Rbwt5mpSX5xCx0Cq",
});

const databaseId = "e52d478b0eb44bfe9b92135465f13c6b";

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: "price",
          direction: "ascending",
        },
      ],
    });

    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}
type Data = {
  items?: (PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse)[];
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name } = req.query;
  if (name == null) {
    return res.status(400).json({ message: "No name" });
  }
  try {
    const response = await getItems();
    res.status(200).json({ items: response?.results, message: `Success` });
  } catch (error) {
    return res.status(400).json({ message: `Failed` });
  }
}
