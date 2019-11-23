pragma solidity >=0.4.21 <0.6.0;

contract Storage {
  address public owner;
  uint number;

  event NumberChanged(uint number);
  constructor() public {
    owner = msg.sender;
    number = 5;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setNumber(uint _number) public {
    number = _number;
    emit NumberChanged(number);
  }

  function getNumber() public view returns(uint) {
    return number;
  }
}
