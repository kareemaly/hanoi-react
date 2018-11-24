import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.h1`
`;

const Subtitle = styled.h2`
`;

const Link = styled.a``;

export default () => (
  <Wrapper>
    <Title>Hanoi Game</Title>
    <Subtitle>Built with React</Subtitle>
    <Link href={'https://github.com/bitriddler/hanoi-react'}>https://github.com/bitriddler/hanoi-react</Link>
  </Wrapper>
);
