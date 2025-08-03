import { useState, useEffect } from 'react';

const LeaderboardPage = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        
        // প্রক্সি এন্ডপয়েন্ট ব্যবহার করে ডেটা ফেচ করুন
        const response = await fetch('/domjudge/public');
        const html = await response.text();
        
        // HTML পার্স করুন
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // স্কোরবোর্ড টেবিল খুঁজুন
        const scoreboardTable = doc.querySelector('table.scoreboard');
        
        // DOMjudge এর CSS স্টাইলশীট খুঁজুন
        const styles = Array.from(doc.querySelectorAll('style, link[rel="stylesheet"]'))
          .map(el => el.outerHTML)
          .join('\n');
        
        // নতুন HTML তৈরি করুন যা শুধুমাত্র টেবিল ধারণ করে
        const newHTML = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${styles}
          </head>
          <body>
            <div class="container">
              <div class="table-container">
                ${scoreboardTable ? scoreboardTable.outerHTML : ''}
              </div>
            </div>
          </body>
          </html>
        `;
        
        // রিলেটিভ URL গুলো অ্যাবসোলিউট URL এ কনভার্ট করা হচ্ছে
        const modifiedHtml = newHTML
          .replace(/href="\//g, 'href="/domjudge/')
          .replace(/src="\//g, 'src="/domjudge/')
          .replace(/url\('\//g, "url('/domjudge/");
        
        setHtmlContent(modifiedHtml);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white text-xl">Loading Leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900">
      <div 
        className="w-full h-full overflow-auto"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default LeaderboardPage;