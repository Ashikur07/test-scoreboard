import React from 'react';

const ExternalPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <iframe
        src="http://172.16.12.245:12345/public"
        title="Leaderboard"
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block'
        }}
      />
    </div>
  );
};

export default ExternalPage;