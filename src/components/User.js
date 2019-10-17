"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Player_1 = require("./Player");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super.call(this) || this;
        _this.chips = 200;
        return _this;
    }
    User.prototype.getChips = function () {
        return this.chips;
    };
    User.prototype.receiveChips = function (chips) {
        this.chips += chips;
    };
    User.prototype.wager = function (ante) {
        if (ante > this.chips) {
            throw new Error("Can't wager more chips than are available!");
        }
        this.chips -= ante;
    };
    return User;
}(Player_1["default"]));
exports["default"] = User;
