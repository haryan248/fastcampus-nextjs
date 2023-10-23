// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: "secret_TrQNgXGKrwfwOo4pen73TyrFtD0Rbwt5mpSX5xCx0Cq",
});

const databaseId = "e52d478b0eb44bfe9b92135465f13c6b";

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}
type Data = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name } = req.query;
  if (name == null) {
    return res.status(400).json({ message: "No name" });
  }
  try {
    await addItem(String(name));
    res.status(200).json({ message: `Success ${name} added` });
  } catch (error) {
    return res.status(400).json({ message: `Fail  ${name} added` });
  }
}
