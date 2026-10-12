
import { useState } from 'react';

function ImageSlider() {
  const images = [
    'https://picsum.photos/id/1015/600/300',
    'https://picsum.photos/id/1016/600/300',
    'https://picsum.photos/id/1018/600/300',
    'https://picsum.photos/id/1020/600/300'
  ];

  const [index, setIndex] = useState(0);

  const previous = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  const next = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Image Slider</h2>

      <img
        src={images[index]}
        alt={`Slide ${index + 1}`}
        style={{
          width: '100%',
          maxWidth: '600px',
          height: '300px',
          objectFit: 'cover'
        }}
      />

      <div style={{ marginTop: '15px' }}>
        <button onClick={previous}>Previous</button>
        {' '}
        <button onClick={next}>Next</button>
      </div>

      <div style={{ marginTop: '15px' }}>
        {images.map((image, i) => (
          <button
            key={image}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              margin: '5px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              border: '1px solid black',
              backgroundColor: index === i ? 'black' : 'white',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>

      <p>Image {index + 1} of {images.length}</p>
    </div>
  );
}

export default ImageSlider;
