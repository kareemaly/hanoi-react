import React from 'react';
import styled from 'styled-components';
import update from 'immutability-helper';

const Wrapper = styled.div` 
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: Droid Sans;
`;

const GameWrapper = styled.div`
  width: 500px;
`;

const Towers = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Tower = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background: ${props => props.isSelected ? '#BBB' : '#EEE'};
  padding: 20px 10px;
  flex-basis: calc(33.33% - 30px);
  cursor: pointer;
  &:hover {
    background: #BBB;
  }
`;

const Disk = styled.div`
  height: 10px;
  width: ${props => (props.value/props.length) * 100}%;
  background: #333;
  margin-top: 3px;
`;

const ErrorMessage = styled.div`
  background: #b71c1c;
  color: #FFF;
  padding: 10px;
  margin-top: 10px;
`;

const ScoreBoard = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background: #EEE;
  display: flex;
  justify-content: space-between;
`;

const Score = styled.div`
  display: flex;
`;

const ScoreKey = styled.div`
  font-weight: bold;
  margin-right: 5px;
`;

const ScoreValue = styled.div``;

const ScoreButton = styled.button`
  border: 0;
  background: #FFF;
  padding: 3px 10px;
  cursor: pointer;
`;

class HanoiGame extends React.Component {
  initialTowers = [
    [ 1, 2, 3, 4 ],
    [ 0, 0, 0, 0 ],
    [ 0, 0, 0, 0 ],
  ];

  state = {
    towerLength: 4,
    towers: this.initialTowers,
    clickedTowerIndex: -1,
    error: null,
    noOfMoves: 0,
  };

  reset = () => {
    this.setState({
      towers: this.initialTowers,
      clickedTowerIndex: -1,
      error: null,
      noOfMoves: 0,
    });
  };

  moveDesk = (col1, col2) => {
    console.log('moving desk', col1, col2);
    const { towers, towerLength, noOfMoves } = this.state;

    const col1LastIndex = towers[col1].findIndex(v => v !== 0);
    const col2LastIndex = towers[col2].findIndex(v => v !== 0);
    const col1Value = towers[col1][col1LastIndex];
    const col2Value = col2LastIndex > -1 ? towers[col2][col2LastIndex] : 0;

    if (!col1Value) {
      this.setState({
        clickedTowerIndex: -1,
        error: `Column (1) doesn't have any disks`,
      });
      return;
    }
    if (col2Value && col1Value > col2Value) {
      this.setState({
        clickedTowerIndex: -1,
        error: `Disk (1) is larger than Disk (2)`,
      });
      return;
    }

    const col2NewIndex = col2LastIndex > -1 ? col2LastIndex - 1 : towerLength - 1;

    this.setState({
      towers: update(towers, {
        [col1]: {
          $set: update(towers[col1], {
            [col1LastIndex]: { $set: 0 },
          }),
        },
        [col2]: {
          $set: update(towers[col2], {
            [col2NewIndex]: { $set: col1Value },
          }),
        },
      }),
      clickedTowerIndex: -1,
      error: null,
      noOfMoves: noOfMoves + 1,
    });
  };

  onTowerClick = (towerIndex) => {
    if (this.state.clickedTowerIndex === towerIndex) {
      return;
    }

    if (this.state.clickedTowerIndex > -1) {
      this.moveDesk(this.state.clickedTowerIndex, towerIndex);
    } else {
      this.setState({ clickedTowerIndex: towerIndex });
    }
  };

  render() {
    const {
      towers,
      towerLength,
      error,
      noOfMoves,
      clickedTowerIndex,
    } = this.state;
    return (
      <Wrapper>
        <GameWrapper>
          <ScoreBoard>
            <Score>
              <ScoreKey>Number of moves: </ScoreKey>
              <ScoreValue>{noOfMoves}</ScoreValue>
            </Score>
            <ScoreButton
              onClick={this.reset}
            >
              Reset
            </ScoreButton>
          </ScoreBoard>
          <Towers>
            {towers.map((tower, i) => (
              <Tower isSelected={clickedTowerIndex === i} onClick={() => this.onTowerClick(i)} key={i}>
                {tower.map((value, j) => (
                  <Disk key={j} length={towerLength} value={value} />
                ))}
              </Tower>
            ))}
          </Towers>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </GameWrapper>
      </Wrapper>
    )
  }
}

export default HanoiGame;
