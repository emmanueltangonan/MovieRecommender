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
    public class ListDataController : Controller
    {
        private readonly IMDB_1Context _context;

        public ListDataController(IMDB_1Context context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("[action]")]
        public List<Genre> Genres()
        {
            List<Genre> result = null;
            try
            {
                result = _context.Genre
                    .OrderBy(genre => genre.Name)
                    .ToList();
            }
            catch (Exception)
            {
                result = null;
            }

            return result;

        }
    }
}