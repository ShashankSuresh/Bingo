import React from 'react';
import styled from 'styled-components';

type ImageProps = {
    src: string;
    alt: string;
    className?: string;
};

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
    return (
        <ImageContainer className={className}>
            <StyledImage src={src} alt={alt} />
        </ImageContainer>
    );
};

export default Image;
