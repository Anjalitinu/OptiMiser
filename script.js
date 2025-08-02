async function generateComplexCode() {
  const userInput = document.getElementById("userCode").value;
  const output = document.getElementById("outputCode");
  output.textContent = "Thinking real hard... 🧠🤓";

  if (!userInput.trim()) {
    output.textContent = "Please paste some code first!";
    return;
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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" // ← use your actual Groq API key here
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a funny AI that rewrites simple code into overly complex but working versions."
          },
          {
            role: "user",
            content: `Make this code as unnecessarily complex as possible, while keeping it functionally the same:\n\n${userInput}`
          }
        ],
        temperature: 1.0
      })
    });

    const text = await response.text();
    output.textContent = "Server says: " + text;
    const data = JSON.parse(text);

    if (data.choices && data.choices.length > 0) {
      const complexCode = data.choices[0].message.content;
      output.textContent = complexCode;
    } else {
      output.textContent = "No response from AI 🤷‍♀️";
    }

  } catch (error) {
    console.error("Error:", error);
    output.textContent = "Error happened: " + error.message;
  }
}
