import React from 'react';
import styled from 'styled-components';

type ImageProps = {
  src: string;
  alt: string;
  height: number;
  width: number;
};

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img<{ width: number, height: number }>`
  max-width: 100%;
  height: auto;

  ${(props) => `
      width: ${props.width};
      height: ${props.height}
  `}

`;

const Image: React.FC<ImageProps> = ({ src, alt, height, width }) => {
  return (
    <ImageContainer>
      <StyledImage src={src} alt={alt} height={height} width={width} />
    </ImageContainer>
  );
};

export default Image;
