import React, { useState, useEffect } from 'react';

const TerminalLoader = ({ message = 'LOADING SYSTEM STATUS' }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-loader">
      <div className="loader-content">
        <pre className="loader-ascii">
{`
╔═══════════════════════════════════════╗
║   ASX SYSTEM STATUS MONITOR v1.0     ║
╚═══════════════════════════════════════╝
`}
        </pre>
        <div className="loader-text">
          {message}{dots.padEnd(3, ' ')}
          <span className="cursor-blink">_</span>
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;
