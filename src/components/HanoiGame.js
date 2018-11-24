import React from 'react';
import styled from 'styled-components';
import update from 'immutability-helper';
import GameDescription from './GameDescription';

class HanoiGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(4);
  }

  incrementDisks = () => {
    this.setState(
      this.getInitialState(this.state.towerLength + 1)
    )
  };

  decrementDisks = () => {
    const disksNo = this.state.towerLength - 1;
    if (disksNo <= 0) {
      this.setState({
        error: `Disks can't be less than 1`,
      });
    } else {
      this.setState(this.getInitialState(disksNo));
    }
  };

  reset = () => {
    this.setState(
      this.getInitialState(this.state.towerLength)
    );
  };

  getInitialState = (towerLength) => ({
    towerLength,
    towers: this.getInitialTowers(towerLength),
    clickedTowerIndex: -1,
    error: null,
    noOfMoves: 0,
  });

  getInitialTowers = (towerLength) => ([
    Array.from({ length: towerLength }, (_, i) => i + 1),
    Array.from({ length: towerLength }, () => 0),
    Array.from({ length: towerLength }, () => 0),
  ]);

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
      this.setState({ clickedTowerIndex: -1 });
    } else if (this.state.clickedTowerIndex > -1) {
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
        <GameDescription />
        <GameWrapper>
          <ScoreBoard>
            <Score>
              <ScoreKey>No. of moves: </ScoreKey>
              <ScoreValue>{noOfMoves}</ScoreValue>
            </Score>
            <Score>
              <ScoreKey>No. of disks: </ScoreKey>
              <ScoreButton onClick={this.incrementDisks}>
                +
              </ScoreButton>
              {towerLength}
              <ScoreButton onClick={this.decrementDisks}>
                -
              </ScoreButton>
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


const Wrapper = styled.div` 
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  font-family: Droid Sans;
`;

const GameWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 50px;
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
  color: #b71c1c;
  margin-top: 10px;
`;

const ScoreBoard = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background: #EEE;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const ScoreKey = styled.div`
  font-weight: bold;
  margin-right: 5px;
  text-align: center;
`;

const ScoreValue = styled.div``;

const ScoreButton = styled.button`
  border: 0;
  background: #FFF;
  padding: 3px 10px;
  cursor: pointer;
  margin: 0 10px;
`;

export default HanoiGame;
