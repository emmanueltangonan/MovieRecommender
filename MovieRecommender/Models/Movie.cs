using System;
using System.Collections.Generic;

namespace MovieRecommender.Models
{
    public class Movie
    {
        public long Id { get; set; }
        public string Tconst { get; set; }
        public decimal? AverageRating { get; set; }
        public long? NumVotes { get; set; }
        public string TitleType { get; set; }
        public string PrimaryTitle { get; set; }
        public string OriginalTitle { get; set; }
        public int? IsAdult { get; set; }
        public int? StartYear { get; set; }
        public int? EndYear { get; set; }
        public int? RuntimeMinutes { get; set; }
        public string Genres { get; set; }
    }
}
