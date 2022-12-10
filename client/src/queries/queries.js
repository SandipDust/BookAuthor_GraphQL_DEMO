import { gql} from '@apollo/client';

//Query from frontend
const getAuthorsQuery = gql`{
    authors{
        name
        id
    }
}`;

//for all the books
const getBooksQuery = gql`{
    books{
        name
        id
    }
}`;



const addBookMutation = gql`
mutation (
    $name: String!, 
    $genre: String!, 
    $authorId: ID!
    ) {
      addBook(name: $name,
         genre: $genre,
          authorId: $authorId
          ) {
          name
          id
          }
}`;

//for single book
const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`;



export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};