import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Col, Row } from "reactstrap";
import style from "./style.module.css";
class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            title: "",
            body: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault(); 
        this.props.addNote({
            title: this.state.title, 
            body: this.state.body, 
            _id: this.props.data._id
        });
        this.setState({ title: "", body: "" });
    }
    render() {
    // let that = this;
        console.log(this.props.data);
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggle}>Notes</ModalHeader>
                    <ModalBody>
                        <Container>
                            {this.props.data.notes.length ? 
                                this.props.data.notes.map(note => (
                                    <div>
                                        <Row key={ note._id }>
                                            <Col xs='10'>
                                                <p>{note.title}</p>
                                                <small>{note.body}</small>
                                            </Col>
                                            <Col xs='2'>
                                                <Button onClick={() => {
                                                    this.props.removeNote({ 
                                                        articleId: this.props.data._id, 
                                                        noteId: note._id 
                                                    });
                                                }}>
                                                &times;
                                                </Button>
                                            </Col>
                                        </Row>
                                        <hr/>
                                    </div>
                                ))
                                :
                                <p>There are no notes for this article.</p>
                            }
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <form onSubmit={ this.handleSubmit }>
                            <label>Title</label>
                            <input name='title' 
                                onChange={ this.handleChange }
                                value={ this.state.title}
                                className={ style.formWidth }/>
                            <label>Body</label>
                            <textarea name='body' rows='4' 
                                className={ style.formWidth } 
                                onChange={ this.handleChange }
                                value={ this.state.body}>
                            </textarea>
                            <Button  className={ style.ripple } type='submit' color="primary">
                            Add Note
                            </Button>{" "}
                            <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                        </form>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default Note;
