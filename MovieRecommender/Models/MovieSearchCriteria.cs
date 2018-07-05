using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieRecommender.Models
{   
    public class MovieSearchCriteria
    {
        public String Genre { get; set; }
        public decimal? Rating { get; set; }
        public int? Year { get; set; }
    }

    public class RandomMovieSearchCriteria: MovieSearchCriteria
    {
        
    }

    public class BrowseMovieSearchCriteria : MovieSearchCriteria
    {
        public string SearchKeyword { get; set; }
        public string SortBy { get; set; }
        public int Page { get; set; }
        public string Order { get; set; }
    }
}
