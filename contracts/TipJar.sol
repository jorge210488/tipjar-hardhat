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

    // Función para recibir propina con mensaje
    function tip(string memory message) public payable {
        require(msg.value > 0, "La propina tiene que ser mas grande que 0");
        require(bytes(message).length <= 200, "El mensaje es demasiado largo");

        tips.push(Tip(msg.sender, msg.value, message, block.timestamp));

        emit NewTip(msg.sender, msg.value, message);
    }

    // Función para retirar fondos (solo owner)
    function withdraw() public {
        require(msg.sender == owner, "solo el dueno puede retirar");

        // Recomendado: usar call en vez de transfer
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Transferencia fallida");
    }

    // Devuelve el número de tips
    function getTipsCount() public view returns (uint) {
        return tips.length;
    }

    // Devuelve todas las propinas (para UI)
    function getAllTips() public view returns (Tip[] memory) {
        return tips;
    }

    // Permite cambiar de owner
    function changeOwner(address newOwner) public {
        require(msg.sender == owner, "solo el dueno puede cambiar el owner");
        require(newOwner != address(0), "direccion invalida");

        owner = newOwner;
    }

    // Recibe ETH sin datos → guarda como tip vacía
    receive() external payable {
        tips.push(Tip(msg.sender, msg.value, "", block.timestamp));
        emit NewTip(msg.sender, msg.value, "");
    }

    // fallback para llamadas con datos no válidos
    fallback() external payable {
        tips.push(Tip(msg.sender, msg.value, "", block.timestamp));
        emit NewTip(msg.sender, msg.value, "");
    }
}
