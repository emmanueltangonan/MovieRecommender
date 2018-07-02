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
                    .Take(10)
                    .ToList();
            }
            catch (Exception)
            {
                result = null;
            }
            return result;
        }

        [HttpPost("[action]")]
        public Movie RandomMovie([FromBody] MovieSearchCriteria movieSearchCriteria)
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