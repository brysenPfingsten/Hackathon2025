import { useState } from 'react';
import './ImageStream.css';

// Import images correctly
import img1 from '../../assets/fake_1.jpg';
import img2 from '../../assets/fake_2.jpg';

const images = [img1, img2];

export default function ImageStream() {
  const [imageList] = useState([...images, ...images]); // Duplicate for seamless loop

  return (
    <div className="image-stream">
      {imageList.map((img, index) => (
        <div 
          key={index} 
          className="stream-item"
          style={{
            animationDuration: `${images.length * 2}s`,
            animationDelay: `${index * 1}s`
          }}
        >
          <img src={img} alt={`Deepfake example ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}