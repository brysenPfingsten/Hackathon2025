import { useState } from 'react';
import './ImageStream.css';

// Import images correctly
import img1 from '../../assets/fake_1.jpg';
import img2 from '../../assets/fake_2.jpg';
import img3 from '../../assets/fake_3.jpg';
import img4 from '../../assets/fake_4.jpg';
import img5 from '../../assets/fake_5.jpg';
import img6 from '../../assets/fake_6.jpg';
import img7 from '../../assets/fake_7.jpg';
import img8 from '../../assets/fake_8.jpg';
import img9 from '../../assets/fake_9.jpg';
import img10 from '../../assets/fake_10.jpg';
import img11 from '../../assets/fake_11.jpg';
import img12 from '../../assets/fake_12.jpg';
import img13 from '../../assets/fake_13.jpg';
import img14 from '../../assets/fake_14.jpg';
import img15 from '../../assets/fake_15.jpg';
import img16 from '../../assets/fake_16.jpg';
import img17 from '../../assets/fake_17.jpg';
import img18 from '../../assets/fake_18.jpg';
import img19 from '../../assets/fake_19.jpg';
import img20 from '../../assets/fake_20.jpg';
import img21 from '../../assets/fake_21.jpg';
import img22 from '../../assets/fake_22.jpg';
import img23 from '../../assets/fake_23.jpg';
import img24 from '../../assets/fake_24.jpg';
import img25 from '../../assets/fake_25.jpg';
import img26 from '../../assets/fake_26.jpg';
import img27 from '../../assets/fake_27.jpg';


const images = [img1, img2, img3, img4, img5, 
  img6, img7, img8, img9, img10, img11, img12
  img13, img14, img15, img16, img17, img18, img19,
  img20, img21, img22, img23, img24, img25, img26,
  img27];

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