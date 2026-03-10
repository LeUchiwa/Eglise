import { useState } from 'react';
import { Search, Book, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

export function Bible() {
  const [reference, setReference] = useState('John 3:16');
  const [verseData, setVerseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [translation, setTranslation] = useState('kjv');

  const searchVerse = async () => {
    if (!reference.trim()) {
      setError('Please enter a Bible reference');
      return;
    }

    setLoading(true);
    setError('');
    setVerseData(null);

    try {
      const formattedRef = reference
        .toLowerCase()
        .replace(/ /g, '+');

      const response = await fetch(`https://bible-api.com/${formattedRef}?translation=${translation}`);

      if (!response.ok) {
        throw new Error('Verse not found. Try "John 3:16" or "Psalm 23"');
      }

      const data = await response.json();
      setVerseData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search error');
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousVerse = () => {
    if (!verseData) return;
    
    const ref = verseData.reference.split(' ');
    const lastPart = ref[ref.length - 1];
    const [chapter, verse] = lastPart.split(':').map(Number);
    
    if (chapter && verse > 1) {
      setReference(`${ref.slice(0, -1).join(' ')} ${chapter}:${verse - 1}`);
      setTimeout(searchVerse, 100);
    }
  };

  const goToNextVerse = () => {
    if (!verseData) return;
    
    const ref = verseData.reference.split(' ');
    const lastPart = ref[ref.length - 1];
    const [chapter, verse] = lastPart.split(':').map(Number);
    
    if (chapter) {
      setReference(`${ref.slice(0, -1).join(' ')} ${chapter}:${verse + 1}`);
      setTimeout(searchVerse, 100);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
        <Book className="w-12 h-12 mb-4" />
        <h1 className="text-4xl font-bold mb-2">The Bible</h1>
        <p className="text-blue-100">Multiple English translations</p>
      </div>

      {/* Search bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchVerse()}
              placeholder="e.g., John 3:16, Psalm 23"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:w-48">
            <select
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="kjv">King James Version</option>
              <option value="web">World English Bible</option>
              <option value="bbe">Bible in Basic English</option>
              <option value="ylt">Young's Literal Translation</option>
            </select>
          </div>

          <div className="md:w-auto">
            <button
              onClick={searchVerse}
              disabled={loading}
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>

      {/* Result */}
      {verseData && (
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 animate-slideUp">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {verseData.reference}
            </h2>
            <p className="text-sm text-gray-500">
              {verseData.translation_name} - {verseData.translation_note}
            </p>
          </div>

          <div className="space-y-4">
            {verseData.verses && verseData.verses.length > 0 ? (
              verseData.verses.map((verse: any, index: number) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                  <p className="text-gray-700 leading-relaxed">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mr-2">
                      v.{verse.verse}
                    </span>
                    {verse.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 leading-relaxed text-lg">
                {verseData.text}
              </p>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={goToPreviousVerse}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous verse</span>
            </button>
            <button
              onClick={goToNextVerse}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Next verse</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Welcome message */}
      {!verseData && !loading && !error && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Search for a verse
          </h3>
          <p className="text-gray-600">
            Try "John 3:16" or "Psalm 23"
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Available translations: KJV, WEB, BBE, YLT
          </p>
        </div>
      )}
    </div>
  );
}