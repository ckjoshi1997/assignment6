"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Contents;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ItemList = _interopRequireDefault(require("./ItemList.jsx"));

var _ItemReport = _interopRequireDefault(require("./ItemReport.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-unresolved */

/* eslint-disable import/extensions */
var NotFound = function NotFound() {
  return /*#__PURE__*/_react.default.createElement("h1", null, "Page Not Found");
};

function Contents() {
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Redirect, {
    exact: true,
    from: "/",
    to: "/items"
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/items",
    component: _ItemList.default
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/report",
    component: _ItemReport.default
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    component: NotFound
  }));
}