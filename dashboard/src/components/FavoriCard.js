import React, { Component } from "react";

import * as Icon from "react-icons/fa";
import { Col } from "react-bootstrap";
class FavoriCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title } = this.props;
    return (
      <Col
        lg="3"
        onClick={this.props.onPress}
        style={{
          background: "url('" + this.props.image + "') no-repeat center center",
          backgroundSize: "cover",
          height: "250px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
            backgroundColor: "rgba(0,0,0,.4)",
            cursor: "pointer",
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            display: "flex"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0"
            }}
          >
            <Icon.FaTimesCircle style={{ margin: "17px" }} size="20" />
          </div>
          <h4
            style={{
              verticalAlign: "center",
              textAlign: "center",
              fontWeight: "lighter",
              padding: "10px"
            }}
          >
            {title}
          </h4>
        </div>
      </Col>
    );
  }
}

export default FavoriCard;
