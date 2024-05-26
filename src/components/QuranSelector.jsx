'use client'
import React, { useState, useEffect } from 'react';
import quran1 from '@/../public/assets/images/quran2.jpg';
import Image from 'next/image';
import Loader from './Loader';
import getChapterName from '@/app/utils/getChapterName';
import generatePDFFrom from '@/app/utils/takeShot';
import generatePDF from '@/app/utils/generatePDF';


const QuranSelector = () => {
  const [selectedVerses, setSelectedVerses] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedChapterName, setSelectedChapterName] = useState('');
  const [startVerse, setStartVerse] = useState('');
  const [endVerse, setEndVerse] = useState('');
  const [availableVerses, setAvailableVerses] = useState([]);
  const [selectedVersesArabic, setSelectedVersesArabic] = useState([]);
  const [arabicData, setArabicData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVerses = async (chapterNumber) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${chapterNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch verses');
      }
      const data = await response.json();
      setLoading(false);
      setSelectedChapterName(`${data.data.englishName} (${data.data.englishNameTranslation})`);
      setArabicData(data?.data);
      const verses = data.data.ayahs.map(ayah => ayah.numberInSurah);
      return verses;
    } catch (error) {
      console.error('Error fetching verses:', error.message);
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    const fetchAvailableVerses = async () => {
      if (selectedChapter !== '') {
        const verses = await fetchVerses(selectedChapter);
        setAvailableVerses(verses);
      }
    };

    fetchAvailableVerses();
  }, [selectedChapter]);

  const handleAddVerse = () => {
    if (startVerse === '' || endVerse === '' || parseInt(startVerse) > parseInt(endVerse)) {
      alert('Please select a valid verse range.');
      return;
    }
    const verseRange = `${startVerse}-${endVerse}`;
    setSelectedVerses([...selectedVerses, { chapter: selectedChapter, verses: verseRange }]);
    setSelectedVersesArabic((prev) => [
      ...prev,
      {
        chapter: selectedChapterName,
        ayahs: arabicData.ayahs.slice(startVerse - 1, endVerse).map(a => ({ number: a.numberInSurah, text: a.text }))
      }
    ]);
  };

  const handleRemoveVerse = (index) => {
    const updatedVerses = [...selectedVerses];
    updatedVerses.splice(index, 1);
    setSelectedVerses(updatedVerses);

    const updatedArabicVerses = [...selectedVersesArabic];
    updatedArabicVerses.splice(index, 1);
    setSelectedVersesArabic(updatedArabicVerses);
  };

  return (
    <div className={`p-4 lg:w-[50%] mx-auto ${loading ? "opacity-50" : "opacity-100"} border-2`}
      style={{ fontFamily: 'var(--font-roboto)' }}
    >
      <div className='flex h-[300px] w-[300px] mx-auto items-center justify-center'>
        <Image alt='quran'
          src={quran1}
          width={400}
          height={200}
          className='h-full w-full '
        />
      </div>
      <h1 className='text-center text-2xl'
        style={{ fontFamily: 'var(--font-dancing-script)' }}
      >Assalamu Alaykum</h1>
      {
        loading && <Loader />
      }
      <div className='bg-quran'>
        <div className="mb-4">
          <label htmlFor="chapter" className="block mb-1">Chapter:</label>
          <select
            id="chapter"
            className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            disabled={loading}
          >
            <option value="">Select a chapter</option>
            {Array.from({ length: 114 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}. {getChapterName(i + 1)} </option>
            ))}
          </select>
        </div>
        {selectedChapterName && <p>Now Selecting from: {selectedChapterName}</p>}
        {selectedChapter && (
          <div className="mb-4">
            <label htmlFor="startVerse" className="block mb-1">Start Verse:</label>
            <select
              id="startVerse"
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              value={startVerse}
              onChange={(e) => setStartVerse(e.target.value)}
              disabled={loading}
            >
              <option value="">Select start verse</option>
              {availableVerses?.map((verse) => (
                <option key={verse} value={verse}>{verse}</option>
              ))}
            </select>
          </div>
        )}
        {selectedChapter && (
          <div className="mb-4">
            <label htmlFor="endVerse" className="block mb-1">End Verse:</label>
            <select
              id="endVerse"
              className="w-full rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              value={endVerse}
              onChange={(e) => setEndVerse(e.target.value)}
              disabled={loading}
            >
              <option value="">Select end verse</option>
              {availableVerses?.map((verse) => (
                verse >= startVerse && <option key={verse} value={verse}>{verse}</option>
              ))}
            </select>
          </div>
        )}
        <button className="btn btn-sm btn-primary" disabled={loading} onClick={handleAddVerse}>Add Verse</button>
      </div>
      <button className='btn btn-sm btn-secondary mt-2' onClick={generatePDF}>Generate PDF</button>
      <div className="mt-4">
        {selectedVerses?.map((verse, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
            <p>Chapter: {verse.chapter}, Verses: {verse.verses}</p>
            <button disabled={loading} className="btn btn-sm btn-secondary mt-2" onClick={() => handleRemoveVerse(index)}>Remove</button>
          </div>
        ))}

        <div id='arabic-content' className=''>
          {selectedVersesArabic.map((verse, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-bold mb-2 mt-4 text-center">{verse.chapter}</h3>
              {verse.ayahs.map((ayah) => (
                <div key={ayah.number} className="flex justify-end items-start py-[25px]">
                  <span
                    style={{ fontFamily: 'var(--font-noorehuda)', fontSize: 26, lineHeight: 1.5, lineHeightStep: 2 }}
                    className="text-right arabic-font ">{ayah.text}</span>
                  <span className="text-right arabic-font my-3 ml-2">({ayah.number})</span>
                  {(index + 1) % 5 === 0 && <div className="page-break"></div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuranSelector;
