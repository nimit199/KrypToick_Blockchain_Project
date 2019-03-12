pragma solidity ^0.4.17;

contract Inbox {
    string public data;

    function Inbox(string initialdata) public {
        data = initialdata;
    }
    
    function setNewData(string newdata) public {
        data = newdata;
    }
}
    //address public deployer;
       // deployer = msg.sender;