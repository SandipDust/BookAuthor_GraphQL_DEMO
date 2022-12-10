
import { useQuery} from '@apollo/client';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';
import { useState } from 'react';

function BookList() {
    
	
	const {loading, error, data} = useQuery(getBooksQuery)
	const [selected, setSelected] = useState(null);
	
	if (data) {
		console.log("data: ", data);
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			<ul id="book-list">
				{data.books.map(book => (
					<li key={book.id}
					onClick={() =>{
						setSelected(book.id);
					}}
					
					>{book.name}</li>
				))}
			</ul>
			{selected? <BookDetails bookId={selected}/> : <div>No Books Selected</div>}
		</div>
		
	);
}

export default BookList;