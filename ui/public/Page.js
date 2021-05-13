"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page;

var _react = _interopRequireDefault(require("react"));

var _Contents = _interopRequireDefault(require("./Contents.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */

/* eslint-disable import/extensions */
function NavBar() {
  return /*#__PURE__*/_react.default.createElement("nav", null, /*#__PURE__*/_react.default.createElement("a", {
    href: "/"
  }, "Home"), ' | ', /*#__PURE__*/_react.default.createElement("a", {
    href: "/#/items"
  }, "Item List"), ' | ', /*#__PURE__*/_react.default.createElement("a", {
    href: "/#/report"
  }, "Report"));
}

function Page() {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(NavBar, null), /*#__PURE__*/_react.default.createElement(_Contents.default, null));
}