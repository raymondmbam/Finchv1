import React, { useState, useEffect } from "react";
import axios from "axios";
import ResponseComponent from "./responseComponent";
import AccountCards from "./accountCards";
import keyboardIcon from "../../Assets/keyboard.svg";
import MicIcon from "../../Assets/Mic.svg";
import "./VoiceInput.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const voiceflowApiKey = "VF.DM.659966b38e056e0007a70011.1dVnphfYAFKc04Dl"; // Replace with your actual Voiceflow API key
const userID = "user_123";

const VoiceInput = ({ initialPlaceholder }) => {
  const [inputMode, setInputMode] = useState("text"); // State to track input mode (text or voice)
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);
  const [recognition, setRecognition] = useState(null); // State to hold the recognition object
  const navigate = useNavigate(); // Get navigate function from React Router

  useEffect(() => {
    if (inputMode === "voice") {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.lang = "en-US";
      recognitionInstance.interimResults = true; // Set interimResults to true to get interim results
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onresult = async (event) => {
        const interimTranscript = event.results[0][0].transcript;
        setInputValue(interimTranscript);
        setPlaceholder(""); // Clear placeholder when listening

        const response = await axios.post(
          `https://general-runtime.voiceflow.com/state/user/${userID}/interact`,
          {
            action: {
              type: "text",
              payload: interimTranscript, // Use interim transcript for interaction
            },
            config: {
              tts: true,
              stripSSML: true,
              stopAll: true,
              excludeTypes: ["block", "debug", "flow"],
            },
          },
          {
            headers: {
              Authorization: voiceflowApiKey,
            },
          },
        );

        const message =
          response.data[1]?.payload?.message || "No response from Voiceflow";
        setOutputValue(message);
      };

      setRecognition(recognitionInstance); // Set recognition instance to state

      recognitionInstance.start(); // Start listening when component mounts

      return () => {
        recognitionInstance.stop();
      };
    }
  }, [inputMode]); // Run effect when input mode changes

  useEffect(() => {
    if (outputValue === "Your savings balance is $5420") {
      // Trigger navigation to the homepage
      navigate("/");
    }
  }, [outputValue, navigate]); // Run effect when outputValue changes

  const handleMicClick = () => {
    // Handle click event for MicIcon
    // Toggle between text input and voice input mode
    setInputMode(inputMode === "text" ? "voice" : "text");
    setInputValue("");
    setOutputValue("");
    setPlaceholder(initialPlaceholder);

    if (inputMode === "text") {
      // Check if recognition is not already running before starting it
      if (recognition && recognition.readyState !== "listening") {
        recognition.start();
      }
    } else {
      // Stop recognition if switching to text input mode
      recognition.stop();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      // Check if Enter key is pressed
      handleSendClick();
    }
  };

  const handleSendClick = async () => {
    try {
      // Send a launch request to start the conversation
      await axios.post(
        `https://general-runtime.voiceflow.com/state/user/${userID}/interact`,
        {
          launch: true,
        },
        {
          headers: {
            Authorization: voiceflowApiKey,
          },
        },
      );

      // Send a text request with the user's input
      const response = await axios.post(
        `https://general-runtime.voiceflow.com/state/user/${userID}/interact`,
        {
          action: {
            type: "text",
            payload: inputValue,
          },
          config: {
            tts: true,
            stripSSML: true,
            stopAll: true,
            excludeTypes: ["block", "debug", "flow"],
          },
        },
        {
          headers: {
            Authorization: voiceflowApiKey,
          },
        },
      );

      // Update the output with Voiceflow's response
      setOutputValue(
        response.data[1]?.payload?.message ||
          response.data[2]?.payload?.message ||
          "No response from Voiceflow",
      );
      setOutputValue(
        response.data[1]?.payload?.message || "No response from Voiceflow",
      );
      if (response.data[2]?.payload?.message) {
        setTimeout(() => {
          setOutputValue(response.data[2]?.payload?.message);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="response-cont">
        <ResponseComponent response={outputValue} />
        {outputValue ===
        "Which account would you like to access? Savings or Checking?" ? (
          <AccountCards />
        ) : null}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="I want to make a transfer"
          value={inputValue}
          className={`input-field ${inputMode === "voice" ? "voice-mode" : ""}`}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={inputMode === "voice"} // Disable input field when in voice input mode
        />
        <div className="keyboard-frame">
          <div className="keyboard">
            {inputMode === "text" ? (
              <img
                className="mic-icon"
                alt="Solar keyboard bold"
                src={MicIcon}
                onClick={() => setInputMode("voice")}
              />
            ) : (
              <img
                className="mic-icon"
                alt="Solar keyboard bold"
                src={keyboardIcon}
                onClick={() => setInputMode("text")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;
