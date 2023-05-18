import { useState, useEffect } from 'react';
import { PixabayAPI } from 'services/pixabay-api';
import Notiflix from 'notiflix';
import { Container } from './styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';

const pixabayApi = new PixabayAPI();

const App = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [cards, setCards] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    (async () => {
      setLoaderVisible(true);
      try {
        const { data } = await pixabayApi.fetchPhotos(query, pageNumber);
        handleSuccessFetch(data);
      } catch (error) {
        handleErrorFetch(error);
      } finally {
        setLoaderVisible(false);
      }
    })();
  }, [pageNumber, query]);

  const handleSubmitForm = currentQuery => {
    if (query !== currentQuery) {
      setQuery(currentQuery);
      setPageNumber(1);
      setLoadMoreBtn(false);
      setCards([]);
    }
  };

  const handleLoadMoreBtnClick = () => {
    setLoadMoreBtn(true);
    setPageNumber(pageNumber => pageNumber + 1);
  };

  const handleSuccessFetch = data => {
    if (data.totalHits === 0) {
      setLoadMoreBtn(false);
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    setLoaderVisible(false);
    setLoadMoreBtn(true);
    setCards(cards => [...cards, ...data.hits]);
    if (data.hits.length < 12) {
      setLoadMoreBtn(false);
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  };

  const handleErrorFetch = error => {
    Notiflix.Notify.failure(error.message);
  };

  return (
    <Container>
      <Searchbar handleSubmit={handleSubmitForm} />
      <ImageGallery cards={cards} />
      {loaderVisible && <Loader />}
      {loadMoreBtn && <Button handleSubmit={handleLoadMoreBtnClick} />}
    </Container>
  );
};

// class App extends Component {
//   state = {
//     query: '',
//     pageNumber: 1,
//     cards: [],
//     loaderVisible: false,
//     loadMoreBtn: false,
//   };

//   async componentDidUpdate(_, prevState) {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.pageNumber !== this.state.pageNumber
//     ) {
//       this.setState({ loaderVisible: true });
//       try {
//         const { data } = await pixabayApi.fetchPhotos(
//           this.state.query,
//           this.state.pageNumber
//         );
//         this.handleSuccessFetch(data);
//       } catch (error) {
//         this.handleErrorFetch(error);
//       } finally {
//         this.setState({ loaderVisible: false });
//       }
//     }
//   }

//   handleSubmitForm = query => {
//     if (this.state.query !== query) {
//       this.setState({
//         cards: [],
//         pageNumber: 1,
//         query,
//         loadMoreBtn: false,
//       });
//     }
//   };

//   handleLoadMoreBtnClick = () => {
//     this.setState(prevState => ({
//       pageNumber: prevState.pageNumber + 1,
//       loadMoreBtn: true,
//     }));
//   };

//   handleSuccessFetch(data) {
//     if (data.totalHits === 0) {
//       this.setState({ loadMoreBtn: false });
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }
//     this.setState(prevState => ({
//       loaderVisible: false,
//       cards: [...prevState.cards, ...data.hits],
//       loadMoreBtn: true,
//     }));
//     if (data.hits.length < 12) {
//       this.setState({ loadMoreBtn: false });
//       Notiflix.Notify.info(
//         `We're sorry, but you've reached the end of search results.`
//       );
//     }
//   }

//   handleErrorFetch(error) {
//     Notiflix.Notify.failure(error.message);
//   }

//   render() {
//     return (
//       <Container>
//         <Searchbar handleSubmit={this.handleSubmitForm} />
//         <ImageGallery cards={this.state.cards} />
//         {this.state.loaderVisible && <Loader />}
//         {this.state.loadMoreBtn && (
//           <Button handleSubmit={this.handleLoadMoreBtnClick} />
//         )}
//       </Container>
//     );
//   }
// }

export default App;

// useEffect(() => {
//   (async () => {
//     try {
//       const books = await fetchBooks();
//       setBooks(books);
//     } catch (err) {
//       console.log('Error occured when fetching books');
//     }
//   })();
// }, []);
