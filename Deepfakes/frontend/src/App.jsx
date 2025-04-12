import NavBar from './components/NavBar/NavBar';
import WhatIsDeepfake from './components/sections/WhatIsDeepfake/WhatIsDeepfake';
import DeepfakeUses from './components/sections/DeepfakeUses/DeepfakeUses';
import DetectDeepfakes from './components/sections/DetectDeepfakes/DetectDeepfakes';
import ImageStream from './components/ImageStream/ImageStream';
import './App.css';

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <WhatIsDeepfake />
        <DeepfakeUses />
        <DetectDeepfakes />
      </main>
      <ImageStream />
    </div>
  );
}

export default App;