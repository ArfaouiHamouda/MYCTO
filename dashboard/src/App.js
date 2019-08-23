import React from "react";
import "./App.css";
import axios from "axios";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import UserCard from "./components/UserCard";
import FavoriCard from "./components/FavoriCard";
import MovieCard from "./components/MovieCard";
import * as Icon from "react-icons/fa";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      allMovies: [],
      username: "",
      showModal: false,
      file: "",
      fileName: ""
    };
  }
  componentDidMount() {
    this.getUsers();
    this.getMovies();
  }

  getMovies = () => {
    axios.get("http://localhost:5000/movies/").then(response => {
      this.setState({
        movies: response.data.movies,
        allMovies: response.data.movies
      });
    });
  };

  getUsers = () => {
    axios.get("http://localhost:5000/users/").then(response => {
      this.setState({ users: response.data.users });
    });
  };

  getUserInfo = (id, username) => {
    let { allMovies } = this.state;
    axios
      .get("http://localhost:5000/users/" + id)
      .then(response => response.data)
      .then(response => {
        this.setState({
          favoris: response.data.movies,
          selectedUser: {
            id: id,
            username: username
          },
          movies: allMovies.filter(item => {
            let isNotFavori = true;
            response.data.movies.forEach(movie => {
              if (movie.id === item.id) {
                isNotFavori = false;
              }
            });
            return isNotFavori;
          })
        });
        console.log(this.state.favoris);
      });
  };

  addToFavori = movie => {
    let { favoris, allMovies, selectedUser } = this.state;
    if (selectedUser === undefined) return false;
    let found = favoris.filter((item, index) => {
      return item.id === movie.id;
    });
    if (found.length !== 0) return false;
    axios
      .post(
        "http://localhost:5000/users/favoris/" + this.state.selectedUser.id,
        {
          movieId: movie.id
        },
        {}
      )
      .then(response => response.data)
      .then(response => {
        favoris.push(movie);
        this.setState({
          favoris,
          movies: allMovies.filter(item => {
            let isNotFavori = true;
            favoris.forEach(movie => {
              if (movie.id === item.id) {
                isNotFavori = false;
              }
            });
            return isNotFavori;
          })
        });

        console.log(this.state.favoris);
      });
  };
  removeFromFavori = movie => {
    let { movies } = this.state;
    axios
      .delete(
        "http://localhost:5000/users/favoris/" + this.state.selectedUser.id,
        {
          data: { movieId: movie.id }
        }
      )
      .then(response => response.data)
      .then(response => {
        movies.push(movie);
        this.setState(prevState => {
          return {
            ...prevState,
            favoris: prevState.favoris.filter(item => {
              return item.id !== movie.id;
            }),
            movies: movies
          };
        });
      });
  };
  addUser = () => {
    const { username, users, file, fileName } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);
    console.log(fileName);
    axios
      .post("http://localhost:5000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-part"
        }
      })
      .then(response => response.data)
      .then(response => {
        if (response.message) {
          alert(response.message);
          this.handleModal();
          return;
        }
        users.push(response.data);
        this.setState({ users });
        this.handleModal();
        console.log(response.data);
      })
      .catch(err => {
        this.handleModal();
        console.log(err.message);
      });
  };
  handleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  onChange = e => {
    this.setState({ file: e.target.files[0] });
    this.setState({ fileName: e.target.files[0].name });
  };

  render() {
    let {
      users,
      favoris,
      movies,
      selectedUser,
      showModal,
      file,
      fileName
    } = this.state;
    let renderUsers, renderFavoris, renderMovies;
    if (movies.length !== 0) {
      renderMovies = movies.map((item, index) => {
        return (
          <MovieCard
            key={index}
            title={item.title}
            image={"https://image.tmdb.org/t/p/w500" + item.image}
            onPress={() => {
              this.addToFavori(item);
            }}
          />
        );
      });
    }
    if (users === undefined) {
      renderUsers = <div>Loading</div>;
    } else {
      renderUsers = users.map((item, index) => {
        return (
          <UserCard
            key={index}
            username={item.username}
            image={item.avatar}
            selected={selectedUser !== undefined && item.id === selectedUser.id}
            onPress={() => this.getUserInfo(item.id, item.username)}
          />
        );
      });
    }
    if (favoris === undefined) {
      renderFavoris = (
        <div
          style={{
            minHeight: "250px",
            textAlign: "center",
            position: "relative"
          }}
        >
          <h5 style={{ verticalAlign: "middle", lineHeight: "250px" }}>
            No User Selected
          </h5>
        </div>
      );
    } else {
      renderFavoris = (
        <Row>
          <Col lg="12">
            <h1>{selectedUser.username}'s favourite movies</h1>
          </Col>
          <Col lg="12">
            <Container fluid={true}>
              <Row>
                {favoris.length !== 0 &&
                  favoris.map((item, index) => {
                    return (
                      <FavoriCard
                        key={index}
                        image={"https://image.tmdb.org/t/p/w500" + item.image}
                        title={item.title}
                        onPress={() => {
                          this.removeFromFavori(item);
                        }}
                      />
                    );
                  })}
                {favoris.length === 0 && <h3>No Movies Found</h3>}
              </Row>
            </Container>
          </Col>
        </Row>
      );
    }
    return (
      <Container fluid={true}>
        <Row>
          <Col lg="3">
            <Row>{renderMovies}</Row>
          </Col>
          <Col lg="9">
            <Row>
              <Col lg="12">
                <h1>Users</h1>
              </Col>
              <Col lg="12">
                <Row>
                  {renderUsers}
                  {/* Add Button */}
                  <Col
                    lg="auto"
                    onClick={this.handleModal}
                    style={{
                      margin: "10px 0px"
                    }}
                  >
                    <div
                      style={{
                        cursor: "pointer",
                        padding: "7px 12px",
                        borderRadius: "20px",
                        backgroundColor: "#9C27B0",
                        color: "#FFF",
                        boxShadow:
                          "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
                      }}
                    >
                      <Icon.FaUserPlus color="#FFF" className="align-middle" />{" "}
                      New User
                    </div>
                  </Col>
                  {/* Modal */}
                  <Modal show={showModal} onHide={this.handleModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Enter Username</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group controlId="file">
                          <input
                            type="file"
                            name="file"
                            onChange={e => {
                              this.onChange(e);
                            }}
                          />
                        </Form.Group>
                        {fileName}
                        <Form.Group controlId="username">
                          <Form.Control
                            onChange={event => {
                              this.setState({ username: event.target.value });
                            }}
                            type="text"
                            placeholder="Eg : JhonDoe"
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={this.handleModal}>
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          this.addUser();
                        }}
                      >
                        Add New User
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* Modal */}
                </Row>
              </Col>
            </Row>
            {renderFavoris}
            <Row />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
