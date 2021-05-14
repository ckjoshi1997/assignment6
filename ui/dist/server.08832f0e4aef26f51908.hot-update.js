exports.id = "server";
exports.modules = {

/***/ "./src/routes.js":
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemList_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemList.jsx */ "./src/ItemList.jsx");
/* harmony import */ var _ItemEdit_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemEdit.jsx */ "./src/ItemEdit.jsx");
/* harmony import */ var _About_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./About.jsx */ "./src/About.jsx");
/* harmony import */ var _NotFound_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NotFound.jsx */ "./src/NotFound.jsx");
 // import ItemReport from './ItemReport.jsx';




const routes = [{
  path: '/items/:id?',
  component: _ItemList_jsx__WEBPACK_IMPORTED_MODULE_0__["default"]
}, {
  path: '/edit/:id',
  component: _ItemEdit_jsx__WEBPACK_IMPORTED_MODULE_1__["default"]
}, //   { path: '/report', component: IssueReport },
{
  path: '/about',
  component: _About_jsx__WEBPACK_IMPORTED_MODULE_2__["default"]
}, {
  path: '*',
  component: _NotFound_jsx__WEBPACK_IMPORTED_MODULE_3__["default"]
}];
/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ })

};
//# sourceMappingURL=server.08832f0e4aef26f51908.hot-update.js.map