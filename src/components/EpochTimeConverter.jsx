import React, { useState, useEffect } from 'react';

const EpochTimeConverter = () => {
  // Epoch state remains the source of truth for the conversion
  const [inputEpoch, setInputEpoch] = useState(Math.floor(Date.now() / 1000));

  // Update the epoch time every second for the live counter display.
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Helper: Format date for display in different timezones.
  const formatDateForTimezone = (epoch, timezone) => {
    try {
      const date = new Date(epoch * 1000);
      return date.toLocaleString('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  // Button to set the epoch to the current time.
  const setCurrentTime = () => {
    const now = Math.floor(Date.now() / 1000);
    setInputEpoch(now);
  };

  // Button to copy the epoch to the clipboard.
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.toString());
  };

  // Safely get UTC string
  const safeUTCString = (epoch) => {
    try {
      return new Date(epoch * 1000).toUTCString();
    } catch (e) {
      return "Invalid date";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
          Epoch to CET Converter
        </h1>
        <div className="text-2xl font-mono bg-gray-800 p-3 rounded-lg inline-block shadow-lg mb-4 mr-10">
          <span className="text-blue-400">Current Epoch: </span>
          <span className="text-purple-400">{currentEpoch}</span>
        </div>
        <div className="text-xl bg-gray-800 p-3 rounded-lg inline-block shadow-lg">
          <span className="text-green-400">
            {formatDateForTimezone(currentEpoch, 'GMT')}
          </span>
        </div>
      </header>

      <div className="mb-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-blue-500 transition-all">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Epoch Input</h2>
          <div className="relative">
            <input
              type="number"
              value={inputEpoch}
              onChange={(e) => {
                const value = e.target.value.trim();
                if (value === '') {
                  setInputEpoch(0);
                } else {
                  const parsed = parseInt(value, 10);
                  if (!isNaN(parsed)) {
                    setInputEpoch(parsed);
                  }
                }
              }}
              className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all mb-4"
              placeholder="Enter epoch time..."
            />
            <div className="absolute right-3 top-3 flex space-x-2">
              <button
                onClick={() => copyToClipboard(inputEpoch)}
                className="text-xs bg-blue-600 hover:bg-blue-700 p-1 rounded"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <button
              onClick={setCurrentTime}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all shadow-lg"
            >
              Set Current Time
            </button>
            <span className="text-sm text-gray-400 mt-2">
              {safeUTCString(inputEpoch)}
            </span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-purple-400">Time Zone Conversions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-green-500 transition-all">
          <h2 className="text-xl font-bold mb-4 text-green-400">GMT Time</h2>
          <div className="mb-4 text-lg">
            {formatDateForTimezone(inputEpoch, 'GMT')}
          </div>
          <div className="mt-4 text-sm bg-gray-900 p-2 rounded">
            <span className="text-green-400">UTC+0</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-yellow-500 transition-all">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">CET Time</h2>
          <div className="mb-4 text-lg">
            {formatDateForTimezone(inputEpoch, 'Europe/Paris')}
          </div>
          <div className="mt-4 text-sm bg-gray-900 p-2 rounded">
            <span className="text-yellow-400">UTC+2</span> diff when daylight mode
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-red-500 transition-all">
          <h2 className="text-xl font-bold mb-4 text-red-400">IST Time</h2>
          <div className="mb-4 text-lg">
            {formatDateForTimezone(inputEpoch, 'Asia/Kolkata')}
          </div>
          <div className="mt-4 text-sm bg-gray-900 p-2 rounded">
            <span className="text-red-400">UTC+5:30 </span>
          </div>
        </div>
      </div>
      {/* <div className="bg-gray-900 p-4 rounded-lg">
        <p className="text-sm mb-2"><b className='text-yellow-400'>What is Epoch Time? </b>
          Epoch time is the number of seconds that have elapsed since January 1, 1970 (UTC).
        </p>
      </div> */}

        <footer className="fixed bottom-0 left-0 w-full bg-gray-800 py-2 text-center text-gray-500 text-sm">
        <p>
            Epoch Converter Utility – feel free to add to the project on{' '}
            <a href="https://github.com/isaac-rnd/epoch-time-converter" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            GitHub ಬೆಂಗಳೂರು❤️
            </a>
        </p>
        </footer>
    </div>
  );
};

export default EpochTimeConverter;
