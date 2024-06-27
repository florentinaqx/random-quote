import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const fallbackQuotes = [
  { text: "Life isn't about getting and having, it's about giving and being.", author: "Kevin Kruse" },
  { text: "Whatever the mind of man can conceive and believe, it can achieve.", author: "Napoleon Hill" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  // Add more quotes as needed
];

const QuoteBox = ({ quote, author, fetchNewQuote }) => (
  <div id="quote-box">
    <QuoteText text={quote} />
    <QuoteAuthor author={author} />
    <NewQuoteButton onClick={fetchNewQuote} />
    <TweetQuoteButton quote={quote} author={author} />
  </div>
);

const QuoteText = ({ text }) => <div id="text">{text}</div>;

const QuoteAuthor = ({ author }) => <div id="author">{author}</div>;

const NewQuoteButton = ({ onClick }) => (
  <button id="new-quote" onClick={onClick}>
    New Quote
  </button>
);

const TweetQuoteButton = ({ quote, author }) => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`;
  return (
    <a id="tweet-quote" href={tweetUrl} target="_blank" rel="noopener noreferrer">
      Tweet Quote
    </a>
  );
};

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchNewQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data.content);
      setAuthor(response.data.author);
    } catch (error) {
      console.error('Error fetching the quote:', error);
      const fallbackQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(fallbackQuote.text);
      setAuthor(fallbackQuote.author);
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  return (
    <div className="App">
      <QuoteBox quote={quote} author={author} fetchNewQuote={fetchNewQuote} />
    </div>
  );
};

export default App;
