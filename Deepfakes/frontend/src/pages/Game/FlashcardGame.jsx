import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const videos = [
  {
    id: 1,
    title: "Video 1: Easy Mode",
    src: "../assets/20250412_1120_Serene Beach Greetings_simple_compose_01jrn9d0a7f6680cjv7wh5567p.mp4",
    answer: "fake",
    hint: "Look at the Shadows."
  },
  {
    id: 1,
    title: "Video 1: Easy Mode",
    src: "../assets/videoplayback (1).mp4",
    answer: "Real",
    hint: "Look Closely at the hands and facial expressions"
  }

];

export default function FlashcardGame() {
  const [step, setStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState("");

  const currentVideo = videos[step];

  const handleGuess = (guess) => {
    if (guess === currentVideo.answer) {
      setFeedback("✅ Correct! Nice job spotting that.");
    } else {
      setFeedback(" Not quite. Try Again");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Deepfake Detection Challenge
      </h1>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{currentVideo.title}</h2>
          <video src={currentVideo.src} controls className="rounded-xl w-full" />
          <div className="flex gap-4">
            <Button onClick={() => handleGuess("real")}>Real</Button>
            <Button onClick={() => handleGuess("fake")}>Fake</Button>
            <Button variant="outline" onClick={() => setShowHint(!showHint)}>
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
          </div>
          {showHint && <p className="text-sm text-muted-foreground">💡 {currentVideo.hint}</p>}
          {feedback && <p className="text-lg mt-2">{feedback}</p>}
          <Button onClick={() => {
            setStep((prev) => (prev + 1) % videos.length);
            setFeedback("");
            setShowHint(false);
          }}>
            Next Video
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
