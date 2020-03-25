import React, { useEffect } from 'react';
import Quagga from 'quagga';

import { Container, Video } from './styles';

function Main() {
  const onDetected = result => {
    Quagga.offDetected();

    let isbn = result.codeResult.code;

    alert(isbn);
  }

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#video"),
          contrains: {
            facingMode: 'environment',
          },
        },
        numOfWorkers: 1,
        locate: true,
        decoder: {
          readers: ['ean_reader']
        },
      }, error => {
        if (error) {
          console.error(error);
          alert("Erro ao abrir a câmera");
          return;
        }
        Quagga.start();
      },
        Quagga.onDetected(onDetected)
      );
    }
  }, []);

  return (
    <Container>
      <Video id="video"/>
    </Container>
  );
}

export default Main;
