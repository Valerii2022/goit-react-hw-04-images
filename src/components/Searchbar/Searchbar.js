import PropTypes from 'prop-types';
import { useState } from 'react';
import { Header, Form, SearchFormBtn, SearchFormInput } from './styled';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

const Searchbar = ({ handleSubmit }) => {
  const [query, setQuery] = useState('');

  const addQueryName = event => {
    setQuery(event.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit(query);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmitForm}>
        <SearchFormBtn type="submit" disabled={!query.trim()}>
          <SearchIcon width="30" height="30" />
        </SearchFormBtn>

        <SearchFormInput
          value={query}
          onChange={addQueryName}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

// class Searchbar extends Component {
//   state = {
//     query: '',
//     pageNumber: 1,
//   };

//   addQueryName = event => {
//     this.setState({ query: event.target.value });
//   };

//   handleSubmitForm = e => {
//     e.preventDefault();
//     this.props.handleSubmit(this.state.query);
//   };

//   render() {
//     return (
//       <Header>
//         <Form onSubmit={this.handleSubmitForm}>
//           <SearchFormBtn type="submit" disabled={!this.state.query.trim()}>
//             <SearchIcon width="30" height="30" />
//           </SearchFormBtn>

//           <SearchFormInput
//             value={this.state.query}
//             onChange={this.addQueryName}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </Form>
//       </Header>
//     );
//   }
// }

export default Searchbar;

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
