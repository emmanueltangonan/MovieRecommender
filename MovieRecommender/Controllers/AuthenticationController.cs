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
    public class AuthenticationController : Controller
    {
        private readonly IMDB_1Context _context;

        public AuthenticationController(IMDB_1Context context)
        {
            _context = context;
        }

        [HttpPost("[action]")]
        [ValidateAntiForgeryToken]
        public IActionResult Login([FromBody] User user)
        {
            User authenticatedUser = null;
            try
            {
                authenticatedUser = new User
                {
                    FullName = "Eman Tangonan"
                };
            }
            catch (Exception)
            {
                return NotFound();
            }

            return Ok(authenticatedUser);

        }
    }
}