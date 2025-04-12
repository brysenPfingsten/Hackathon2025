import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function DeepfakeGame() {
  const [currentImage, setCurrentImage] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const hints = [
    "Look for unnatural blinking patterns or lack of blinking in videos.",
    "Check for inconsistent lighting or shadows on the face.",
    "Watch for unnatural facial movements or expressions.",
    "Look for blurring or warping around the edges of the face.",
    "Check for unnatural skin tones or texture.",
    "Listen for mismatched audio and lip movements.",
    "Look for unnatural hair details that might be poorly rendered.",
    "Check for teeth that look too perfect or unnatural."
  ];
  
  useEffect(() => {
    fetchRandomImage();
  }, []);
  
  const fetchRandomImage = async () => {
    setLoading(true);
    try {
      const labelType = Math.random() > 0.5 ? "Real" : "Fake";
      const response = await fetch(`/api/image/random?label=${labelType}`);
      const data = await response.json();
      console.log(data);
      
      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      setCurrentImage({
        url: data.url,
        label: labelType,
        hint: randomHint
      });
    } catch (error) {
      console.error("Error fetching image:", error);
      setCurrentImage({
        url: "https://example.com/placeholder.jpg",
        label: Math.random() > 0.5 ? "Real" : "Fake",
        hint: hints[0]
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGuess = (guess) => {
    if (!currentImage) return;
    
    setGameStarted(true);
    
    if (guess === currentImage.label) {
      const pointsEarned = 10 + (streak * 5);
      setScore(score + pointsEarned);
      setStreak(streak + 1);
      setFeedback(`✅ Correct! +${pointsEarned} points (Streak: ${streak + 1})`);
    } else {
      setStreak(0);
      setFeedback(`❌ Incorrect! The image was ${currentImage.label}.`);
    }
    
    setProgress(Math.min(progress + 10, 100));
  };
  
  // Custom Progress Bar Component
  const ProgressBar = ({ value }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
    <div 
    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
    style={{ width: `${value}%` }}
    />
    </div>
  );
  
  // ... (rest of your component remains the same) ...
  
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-6 text-center">
    Deepfake Detection Challenge
    </h1>
    
    <div className="flex justify-between items-center mb-4">
    <div className="font-semibold">Score: {score}</div>
    <div className="font-semibold">Streak: {streak}</div>
    </div>
    
    <ProgressBar value={progress} />
    
    <Card>
    <CardContent className="flex flex-col gap-4 pt-6">
    <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
    {loading ? (
      <div className="text-gray-500">Loading media...</div>
    ) : currentImage?.url ? (
      currentImage.url.match(/\.(mp4|mov|webm)$/i) ? (
        <video
          key={currentImage.url} // Important for re-rendering
          src={currentImage.url}
          controls
          className="w-full h-full object-cover"
          onLoadedData={() => setLoading(false)}
          onError={(e) => {
            console.error("Video error:", e);
            setLoading(false);
          }}
          playsInline
          muted
          autoPlay
        >
          Your browser does not support videos.
        </video>
      ) : (
        <img
          key={currentImage.url} // Important for re-rendering
          src={currentImage.url}
          alt="Is this real or fake?"
          className="w-full h-full object-contain"
          onLoad={() => setLoading(false)}
          onError={(e) => {
            console.error("Image error:", e);
            setLoading(false);
          }}
        />
      )
    ) : (
      <div className="text-red-500">No media available</div>
    )}
  </div>
    
    <div className="flex gap-4 justify-center">
    <Button 
    onClick={() => handleGuess("Real")}
    variant={feedback.includes("Real") ? "default" : "outline"}
    disabled={!!feedback}
    >
    Real
    </Button>
    <Button 
    onClick={() => handleGuess("Fake")}
    variant={feedback.includes("Fake") ? "default" : "outline"}
    disabled={!!feedback}
    >
    Fake
    </Button>
    <Button 
    variant="outline" 
    onClick={() => setShowHint(!showHint)}
    disabled={!!feedback}
    >
    {showHint ? "Hide Hint" : "Show Hint"}
    </Button>
    </div>
    
    {showHint && (
      <div className="bg-blue-50 p-4 rounded-lg">
      <p className="text-sm text-blue-800">💡 Hint: {currentImage?.hint}</p>
      </div>
    )}
    
    {feedback && (
      <div className={`p-4 rounded-lg ${
        feedback.includes("✅") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
      }`}>
      <p className="font-medium">{feedback}</p>
      {feedback.includes("❌") && (
        <p className="text-sm mt-1">Try the next one!</p>
      )}
      </div>
    )}
    
    <div className="flex justify-center gap-4">
    {feedback ? (
      <Button onClick={nextImage}>Next Image</Button>
    ) : (
      <Button variant="outline" onClick={resetGame}>
      Reset Game
      </Button>
    )}
    </div>
    </CardContent>
    </Card>
    
    {gameStarted && (
      <div className="mt-6 text-center text-sm text-muted-foreground">
      <p>Current streak bonus: {streak * 5} extra points per correct answer</p>
      </div>
    )}
    </div>
  );
  
  function nextImage() {
    setFeedback("");
    setShowHint(false);
    fetchRandomImage();
  }
  
  function resetGame() {
    setScore(0);
    setStreak(0);
    setProgress(0);
    setGameStarted(false);
    setFeedback("");
    setShowHint(false);
    fetchRandomImage();
  }
}