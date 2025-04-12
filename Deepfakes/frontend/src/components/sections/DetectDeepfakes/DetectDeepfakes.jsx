import './DetectDeepfakes.css';

export default function DetectDeepfakes() {
  return (
    <section id="detect">
      <h2>How Can I Detect Deepfakes?</h2>
      <p>
        While deepfakes are becoming increasingly sophisticated, there are still signs that can help identify them:
      </p>
      <ul className="detection-list">
        <li>
          <strong>Facial inconsistencies:</strong> Look for unnatural eye movements, blinking patterns, or facial expressions that don't match emotions.
        </li>
        <li>
          <strong>Audio-visual mismatches:</strong> Check if lip movements sync perfectly with spoken words.
        </li>
        <li>
          <strong>Unnatural lighting/shadows:</strong> AI may struggle with consistent lighting on faces.
        </li>
        <li>
          <strong>Digital artifacts:</strong> Look for blurring, strange pixilation, or distortions around edges.
        </li>
        <li>
          <strong>Context clues:</strong> Consider if the content seems out of character or too sensational.
        </li>
      </ul>
      <div className="tools">
        <h3>Detection Tools</h3>
        <p>
          Several organizations are developing deepfake detection tools, including Microsoft's Video Authenticator, 
          Intel's FakeCatcher, and various academic research projects.
        </p>
      </div>
    </section>
  );
}