import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
// eslint-disable-line import/no-unresolved
import { ComponentNode, TextNode, ElementNode } from '../node';
import { NODE_TYPE } from '../constants';

function mapReactProps(props) {
  var innerHTML = props.innerHTML,
      remainingProps = _objectWithoutPropertiesLoose(props, ["innerHTML"]);

  var dangerouslySetInnerHTML = innerHTML ? {
    __html: innerHTML
  } : null;
  return _extends({
    dangerouslySetInnerHTML: dangerouslySetInnerHTML
  }, remainingProps);
}

export function react(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      React = _ref.React;

  if (!React) {
    throw new Error("Must pass React library to react renderer");
  }

  var reactRenderer = function reactRenderer(node) {
    if (node.type === NODE_TYPE.COMPONENT) {
      return React.createElement.apply(React, [function () {
        return node.renderComponent(reactRenderer) || null;
      }, node.props].concat(node.renderChildren(reactRenderer)));
    }

    if (node.type === NODE_TYPE.ELEMENT) {
      return React.createElement.apply(React, [node.name, mapReactProps(node.props)].concat(node.renderChildren(reactRenderer)));
    }

    if (node.type === NODE_TYPE.TEXT) {
      return node.text;
    }

    throw new TypeError("Unhandleable node");
  };

  return reactRenderer;
}