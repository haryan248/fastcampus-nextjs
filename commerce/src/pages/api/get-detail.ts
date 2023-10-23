// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import { GetPagePropertyResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: "secret_TrQNgXGKrwfwOo4pen73TyrFtD0Rbwt5mpSX5xCx0Cq",
});

const databaseId = "e52d478b0eb44bfe9b92135465f13c6b";

async function getDetails(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    });

    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}
type Data = {
  detail?: GetPagePropertyResponse;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name } = req.query;
  if (name == null) {
    return res.status(400).json({ message: "No name" });
  }
  try {
    const { pageId, propertyId } = req.query;
    const response = await getDetails(String(pageId), String(propertyId));
    res.status(200).json({ detail: response, message: `Success` });
  } catch (error) {
    return res.status(400).json({ message: `Failed` });
  }
}
