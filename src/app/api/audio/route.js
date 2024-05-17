import { NextResponse } from "next/server";
// import fetch from 'node-fetch'; // Import node-fetch to perform HTTP requests

export const POST = async (request) => {
  try {
    // // Extract parameters from the POST request body
    // const { reciter, surahNumber, startAyah, endAyah } = await request.json();

    // // Construct the URL to fetch audio for the specified Quranic verses
    // const audioUrl = `https://api.alquran.cloud/ayah/${"alafasy"}/${surahNumber}:${startAyah}-${surahNumber}:${endAyah}`;

    // // Fetch the audio data from the specified URL
    const reciter = "alafasy"; // Example: Sheikh Mishary Rashid Alafasy

    const surahNumber = 2; // Surah Al-Baqarah
    const startAyah = 255; // Ayah 255 (Ayat al-Kursi)
    const endAyah = 260; // Ayah 260

    // const audioUrl = `https://api.alquran.cloud/ayah/${reciter}/${surahNumber}:${startAyah}-${surahNumber}:${endAyah}`;
    const audioUrl = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/262.mp3";

    const response = await fetch(audioUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Get audio data as a Buffer
    const audioBuffer = await response.buffer();

    // Return the audio data as a binary response with the appropriate content type
    return NextResponse.binary(audioBuffer, {
      headers: { "Content-Type": "audio/mpeg" },
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
