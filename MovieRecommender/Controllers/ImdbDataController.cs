using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRecommender.Models;

namespace MovieRecommender.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ImdbDataController : Controller
    {
        private readonly IMDB_1Context _context;

        public ImdbDataController(IMDB_1Context context)
        {
            _context = context;
        }
        
        [HttpGet("[action]")]
        public List<Movie> Movies()
        {
            //Random rand = new Random();
            //int skip = (int)(rand.NextDouble() * _context.Movie.Count());
            //return _context.Movie.OrderBy(o => o.Id).Skip(skip).Take(1).First();
            List<Movie> result = null;
            try
            {
                result = _context.Movie
                    .Where(
                        movie => movie.TitleType == "movie"
                        && movie.Genres.Contains("Comedy")
                        && movie.StartYear >= 2010
                        && movie.AverageRating >= 7.0m
                        && movie.NumVotes >= 1000
                    )
                    .OrderBy(o => Guid.NewGuid())
                    .Take(15)
                    .ToList();
            }
            catch (Exception)
            {
                result = null;
            }
            return result;
        }

        [HttpPost("[action]")]
        public Dictionary<string, Object> Movies([FromBody] BrowseMovieSearchCriteria movieSearchCriteria)
        {
            Dictionary<string, Object> result = new Dictionary<string, object>();
            List<Movie> movies = null;
            const int itemsPerPage = 15;
            int page = movieSearchCriteria.Page < 1 ? 1 : movieSearchCriteria.Page;
            try
            {
                var query = _context.Movie
                        .Where(
                            movie => movie.TitleType == "movie"
                            && movie.NumVotes >= 1000
                        );
                // GENRE
                if (!String.IsNullOrEmpty(movieSearchCriteria.Genre) && !movieSearchCriteria.Genre.Equals("All"))
                {
                    query = query.Where(movie => movie.Genres.Contains(movieSearchCriteria.Genre));
                }
                // YEAR
                if (movieSearchCriteria.Year != null && movieSearchCriteria.Year > 0)
                {
                    query = query.Where(movie => movie.StartYear >= movieSearchCriteria.Year);
                }
                // RATING
                if (movieSearchCriteria.Rating != null && movieSearchCriteria.Rating > 0)
                {
                    query = query.Where(movie => movie.AverageRating >= movieSearchCriteria.Rating);
                }
                
                // SEARCH KEYWORD
                string key = movieSearchCriteria.SearchKeyword;
                if (!String.IsNullOrEmpty(key)) { 
                    query = query
                        .Where(
                            movie => movie.PrimaryTitle.ToLower().Contains(key.ToLower())
                        );
                }

                // GET COUNT
                int totalItems = query.Count();

                bool isDescending = false;
                // ORDER ASCENDING OR DESCENDING
                if (!String.IsNullOrEmpty(movieSearchCriteria.Order)
                    && movieSearchCriteria.Order.ToLower().Equals("descending"))
                {
                    isDescending = true;
                }

                // SORT BY
                switch (movieSearchCriteria.SortBy.ToLower()) {
                    case "rating":
                        if (isDescending)
                            query = query.OrderByDescending(movie => movie.AverageRating);
                        else
                            query = query.OrderBy(movie => movie.AverageRating);
                        break;
                    case "year":
                        if (isDescending)
                            query = query.OrderByDescending(movie => movie.StartYear);
                        else
                            query = query.OrderBy(movie => movie.StartYear);
                        break;
                    case "title": default:
                        if (isDescending)
                            query = query.OrderByDescending(movie => movie.PrimaryTitle);
                        else
                            query = query.OrderBy(movie => movie.PrimaryTitle);
                        break;

                }

                // SKIP
                if (page > 1)
                {
                    int skipQuantity = (page - 1) * itemsPerPage;
                    query = query.Skip(skipQuantity);
                }

                query = query
                        .Take(itemsPerPage);

                movies = query.ToList();

                result.Add("data", movies);
                result.Add("page", page);
                result.Add("totalItems", totalItems);
            }
            catch (Exception)
            {
                result = null;
            }

            return result;

        }

        [HttpPost("[action]")]
        public Movie RandomMovie([FromBody] RandomMovieSearchCriteria movieSearchCriteria)
        {
            Movie result = null;
            try
            {
                var query = _context.Movie
                        .Where(
                            movie => movie.TitleType == "movie"
                            //&& movie.Genres.Contains("Comedy")
                            //&& movie.StartYear >= 2010
                            //&& movie.AverageRating >= 7.0m
                            && movie.NumVotes >= 1000
                        );
                if (!String.IsNullOrEmpty(movieSearchCriteria.Genre) && !movieSearchCriteria.Genre.Equals("All"))
                {
                    query = query.Where(movie => movie.Genres.Contains(movieSearchCriteria.Genre));
                }
                if (movieSearchCriteria.Year != null && movieSearchCriteria.Year > 0)
                {
                    query = query.Where(movie => movie.StartYear >= movieSearchCriteria.Year);
                }
                if (movieSearchCriteria.Rating != null && movieSearchCriteria.Rating > 0)
                {
                    query = query.Where(movie => movie.AverageRating >= movieSearchCriteria.Rating);
                }
                result = query.OrderBy(o => Guid.NewGuid())
                        .First();
            }
            catch (Exception)
            {
                result = null;
            }
            
            return result;

        }

        [HttpGet("[action]")]
        public Movie Movie(string tconst)
        {
            Movie result = null;
            try
            {
                result = _context.Movie
                        .Single(
                            movie => movie.Tconst.Equals(tconst)
                        );
            }
            catch (Exception)
            {
                result = null;
            }

            return result;

        }
    }


}