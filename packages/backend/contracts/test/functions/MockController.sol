// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "../../BaseResultController.sol";

contract MockControllerFunction is BaseResultController,FunctionsClient, ConfirmedOwner {
  using FunctionsRequest for FunctionsRequest.Request;
    bytes32 public donId; // DON ID for the Functions DON to which the requests are sent
    uint64 private subscriptionId;
    bytes32 public s_lastRequestId;
    string public s_lastError;

    // string private constant SOURCE = "const randomNumber = Math.floor(Math.random() * 10); const result = randomNumber.toString(); return Functions.encodeString(result);";
    string private constant SOURCE = "return Functions.encodeString('5');";
    // string private constant SOURCE = "return Functions.encodeString(Math.floor(Math.random() * 10).toString());";
    constructor(
        address router,
        bytes32 _donId,
        uint64 _subscriptionId
    ) FunctionsClient(router) ConfirmedOwner(msg.sender) {
        subscriptionId = _subscriptionId;
        donId = _donId;
        createOutcomes();
    }

    function sendRequest() external onlyOwner {
        FunctionsRequest.Request memory req; // Struct API reference: https://docs.chain.link/chainlink-functions/api-reference/functions-request
        req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, SOURCE);
        s_lastRequestId = _sendRequest(req.encodeCBOR(), subscriptionId, 300000, donId);
    }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        s_lastError = string(err);
        bytes32 responseHash = keccak256(response);
        if (responseHash == keccak256(bytes("0"))) {
            _setResult(0);
        } else if (responseHash == keccak256(bytes("1"))) {
            _setResult(1);
        } else if (responseHash == keccak256(bytes("2"))) {
            _setResult(2);
        } else if (responseHash == keccak256(bytes("3"))) {
            _setResult(3);
        } else if (responseHash == keccak256(bytes("4"))) {
            _setResult(4);
        } else if (responseHash == keccak256(bytes("5"))) {
            _setResult(5);
        } else if (responseHash == keccak256(bytes("6"))) {
            _setResult(6);
        } else if (responseHash == keccak256(bytes("7"))) {
            _setResult(7);
        } else if (responseHash == keccak256(bytes("8"))) {
            _setResult(8);
        } else if (responseHash == keccak256(bytes("9"))) {
            _setResult(9);
        }
    }

    function createOutcomes() private {
        _addOutcome(bytes32("Real Madrid"));
        _addOutcome(bytes32("Barcelona"));
        _addOutcome(bytes32("Manchester United"));
        _addOutcome(bytes32("Bayern Munich"));
        _addOutcome(bytes32("Juventus"));
        _addOutcome(bytes32("Paris Saint-Germain"));
        _addOutcome(bytes32("Liverpool"));
        _addOutcome(bytes32("Chelsea"));
        _addOutcome(bytes32("Manchester City"));
        _addOutcome(bytes32("Atletico Madrid"));
    }

    function _getGame() internal pure override returns(bytes32) {
        return bytes32(abi.encodePacked("UEFA Champions League"));
    }
}