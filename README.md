# Text Summarizer

A simple web application that summarizes text using the Claude API.

## Features

- Input large text for summarization
- Adjustable token limit with slider (0-300)
- Loading spinner during API calls
- Displays summarized output

## Tech Stack

- React + TypeScript
- Vite
- Anthropic Claude API
- CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Paste text into the textarea
2. Adjust the word limit using the slider
3. Click "Summarize" to get a summary
4. View the result in the output section
