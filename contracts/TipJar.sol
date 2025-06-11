// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TipJar {
    address public owner;

    event NewTip(address indexed from, uint amount, string message);

    struct Tip {
        address tipper;
        uint amount;
        string message;
        uint timestamp;
    }

    Tip[] public tips;

    constructor() {
        owner = msg.sender;
    }

    function tip(string memory message) public payable {
        require(msg.value > 0, "La propina tiene que ser mas grande que 0");

        tips.push(Tip(msg.sender, msg.value, message, block.timestamp));

        emit NewTip(msg.sender, msg.value, message);
    }

    function withdraw() public {
        require(msg.sender == owner, "solo el dueno puede retirar");

        payable(owner).transfer(address(this).balance);
    }

    function getTipsCount() public view returns (uint) {
        return tips.length;
    }
}
