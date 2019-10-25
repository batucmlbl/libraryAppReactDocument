import React, {Component}  from 'react';
import {Label,Input,FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';
class App extends Component {

  state = {
    books:[],

    newBookData:{
      name:'',
      authorName:'',
      releaseYear:''
    },

    editBookData:{
      id:'',
      name:'',
      authorName:'',
      releaseYear:''
    },

    newBookModal:false,

    editBookModal:false
  }
  componentWillMount(){
    this.refreshBooks();
    
  }

  toggleNewBookModal(){
      this.setState({
          newBookModal:! this.state.newBookModal
      });
  }

  toggleEditBookModal(){
    this.setState({
      editBookModal:! this.state.editBookModal
    });
  }

  addBook(){
    axios.post('http://localhost:8080/library/books/', this.state.newBookData).then((response)=>{
       let{books} = this.state;
       books.push(response.data) ;
       this.setState({books, newBookModal: false, newBookData:{
        name:'',
        authorName:'',
        releaseYear:''
      }})

  });
  }
  updateBook(){
    let{name,authorName,releaseYear } = this.state.editBookData;
    axios.put('http://localhost:8080/library/books/' + this.state.editBookData.id,{
      name, authorName,releaseYear

    }).then((response) =>{
        this.refreshBooks();
        
        this.setState({
          editBookModal:false, editBookData:{
            id :'',
            name:'',
            authorName:'',
            releaseYear:''

          }
        })
    })
  }
  editBook(id,name,authorName,releaseYear){
    this.setState({
      editBookData:{id,name,authorName,releaseYear}, editBookModal:!this.state.editBookModal
  });



  } 
  deleteBook(id){
    axios.delete('http://localhost:8080/library/books/' + id).then((response)=>{
      this.refreshBooks();

    })
  }
  refreshBooks(){
    axios.get('http://localhost:8080/library/books/').then ((response )=>{
      this.setState({
        books: response.data
      })
    })

  }
  render(){
    let books = this.state.books.map((book) => {
        return(
          <tr key ={book.id}>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.authorName}</td>
            <td>{book.releaseYear}</td>
            <td>
              
              <Button color="info" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.id,book.name,book.authorName,book.releaseYear)}>Edit</Button>  
              <Button color="danger" size="sm" onClick={this.deleteBook.bind(this, book.id)}>Delete</Button>  

            </td>
          </tr>
        )

    });

    return (
      <div className="App container">

        <h1>LIBRARY</h1>

          <Button className="my-3" color="warning" size="lg" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
            <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add A New Book</ModalHeader>
          <ModalBody>

            
            <FormGroup>
              <Label for="name">Book Title</Label>
              <Input id="name" value={this.state.newBookData.name} onChange={(e)=>{
                  let {newBookData} = this.state;
                  newBookData.name = e.target.value;
                  this.setState({newBookData})
              }}/>
            </FormGroup>


            <FormGroup>
              <Label for="authorName">Author</Label>
              <Input id="authorName" value={this.state.newBookData.authorName} onChange={(e)=>{
                  let {newBookData} = this.state;
                  newBookData.authorName = e.target.value;
                  this.setState({newBookData})

              }}/>
            </FormGroup>


            <FormGroup>
              <Label for="releaseYear">Release Year</Label>
              <Input id="releaseYear" value={this.state.newBookData.releaseYear} onChange={(e)=>{
                  let {newBookData} = this.state;
                  newBookData.releaseYear = e.target.value;
                  this.setState({newBookData})

              }}/>
            </FormGroup>


          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>Add Book</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
            <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
              <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit A Book</ModalHeader>
                <ModalBody>

                  <FormGroup>
                    <Label for="name">Book Title</Label>
                      <Input id="name" value={this.state.editBookData.name} onChange={(e)=>{
                      let {editBookData} = this.state;
                      editBookData.name = e.target.value;
                      this.setState({editBookData})
                      }}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="authorName">Author</Label>
                      <Input id="authorName" value={this.state.editBookData.authorName} onChange={(e)=>{
                      let {editBookData} = this.state;
                      editBookData.authorName = e.target.value;
                      this.setState({editBookData})
                      }}/>
                  </FormGroup>

                  <FormGroup>
                    <Label for="releaseYear">Release Year</Label>
                      <Input id="releaseYear" value={this.state.editBookData.releaseYear} onChange={(e)=>{
                      let {editBookData} = this.state;
                      editBookData.releaseYear = e.target.value;
                      this.setState({editBookData})
                  }}/>
                  </FormGroup>


                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.updateBook.bind(this)}>Update Book</Button>{' '}
                  <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Table dark>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Release Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books}
              </tbody>
            </Table>
      </div>
    );
  }
}
export default App;