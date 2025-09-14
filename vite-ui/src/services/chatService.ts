interface AIRequest {
  text: string;
}

interface AIResponse {
  response: string;
}

export const getAIResponse = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message } as AIRequest),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: AIResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error getting AI response:', error);
    return 'Sorry, I am having trouble connecting to the server.';
  }
};
