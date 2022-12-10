
import { useQuery, useMutation} from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import { useState } from 'react';


function DisplayAuthors(loading, error, data){

    if(loading){
        return( <option disabled>Loading authors</option> );
    } 
    if (error) return <option>Error :</option>;
    
    else {
        return data.authors.map(author => {
            return( <option key={ author.id } value={author.id}>{ author.name }</option> );
        });
    }    
}

//Adds Book based on selection
const AddBook= () =>{
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBookMut] = useMutation(addBookMutation);

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newObj = {name, genre, authorId}

        console.log("newobject");
        console.log(newObj);

        addBookMut({
            variables: {
              name: name,
              genre: genre,
              authorId: authorId
            },
            refetchQueries:[getBooksQuery]
          });
        
    }

	return (
		<form id="add-book" onSubmit={handleSubmit}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            
            <div className="field">
                <label>Genre:</label>
                <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)}  />
            </div>

            <div className="field">
                <label>Author:</label>
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} >
                    { DisplayAuthors(loading,error,data) }
                </select>
            </div>

            <button>+</button>

      </form>
	);
}

export default AddBook;