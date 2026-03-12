import Airtable from 'airtable';
import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';

dotenv.config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(process.env.BASE_ID!);

export async function GET() {
    const projects = await base(process.env.PRODUCTS_TABLE_ID!).select({
        filterByFormula: `{Status} = 'Approved'`
    }).all();

    return json(projects.map(r => ({
        "Product Name": r.fields["Product Name"],
        "Description": r.fields["Description"],
        "Code URL": r.fields["Code URL"],
        "GitHub Username": r.fields["GitHub Username"],
        "Playable URL": r.fields["Playable URL"],
        "Screenshot": r.fields["Screenshot"],
        "Hours": r.fields["Hours"],
        "SlackID": r.fields["SlackID"],
    })));
}
