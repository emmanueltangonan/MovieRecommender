import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchData';
import Counter from './components/Counter';
import RandomMovie from './components/movies/RandomMovie';
import MovieList from './components/movieList/MovieList';
import MovieDetailsPage from './components/movieList/MovieDetailsPage';

export const routes = <Layout>
    <Route exact path='/' component={ RandomMovie } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/movies' component={MovieList} />
    <Route path='/movie/:tconst' component={MovieDetailsPage} />
</Layout>;
