"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ItemTable;

/* globals React */
function ItemRow(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, item.name), /*#__PURE__*/React.createElement("td", null, "$".concat(item.price)), /*#__PURE__*/React.createElement("td", null, item.category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
    href: item.image,
    target: "_blank",
    rel: "noreferrer"
  }, "View")));
}

function ItemTable(_ref2) {
  var items = _ref2.items;
  var itemRows = items.map(function (item) {
    return /*#__PURE__*/React.createElement(ItemRow, {
      key: item.id,
      item: item
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image"))), /*#__PURE__*/React.createElement("tbody", null, itemRows));
}