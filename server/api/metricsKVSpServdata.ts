import { defineEventHandler } from 'h3';

declare module "h3" {
  interface H3EventContext {
    cloudflare: {
      request: Request;
      env: {
        MY_KV: metricskv; // Your KV namespace binding name
      };
      context: ExecutionContext;
    };
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { cloudflare } = event.context; //
    const MY_KV = cloudflare.env.metricskv; // Access your KV namespace

    // Example: Get a value from KV
    const myValue = await MY_KV.get("SpServdata"); //

    if (myValue) {
      return(JSON.parse(myValue)); // Return the data
    } else {
      throw createError({ statusCode: 404, message: "Data not found" });
    }
  } catch (error) {
    console.error("Error accessing KV:", error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});