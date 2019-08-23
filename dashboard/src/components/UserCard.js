import React, { Component } from "react";

import { Col, Image } from "react-bootstrap";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { username, selected } = this.props;
    return (
      <Col
        lg="auto"
        onClick={this.props.onPress}
        style={{
          margin: "10px 0px"
        }}
      >
        <div
          style={{
            cursor: "pointer",
            backgroundColor: selected === true ? "rgba(3, 169, 244,.1)" : null,
            textAlign: "center",
            padding: "5px 20px",
            fontSize: 16,
            borderRadius: 8,
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
          }}
        >
          <Image
            src={"http://localhost:3000/uploads/" + this.props.image}
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              backgroundSize: "cover",
              marginRight: "10px"
            }}
          />

          {username}
        </div>
      </Col>
      //   <div style={styles.container} onClick={this.props.onPress}>
      //     {username}
      //   </div>
    );
  }
}

export default UserCard;
