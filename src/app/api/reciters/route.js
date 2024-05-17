import { NextResponse } from "next/server";
 // Import node-fetch to perform HTTP requests

export const GET = async () => {
  try {
    const response = await fetch('https://api.alquran.cloud/edition');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Process the data as needed, for example:
    const editions = data.data; // Assuming 'data' contains the editions array

    // Return a successful response with the editions data
    return NextResponse.json({
      status: 200,
      data: editions,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    // Return an error response if fetching or processing data fails
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error.",
    });
  }
};
