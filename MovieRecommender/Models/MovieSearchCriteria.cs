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
}
