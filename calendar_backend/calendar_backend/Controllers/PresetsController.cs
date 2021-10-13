using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using calendar_backend.Models;
using calendar_backend.Models.DbContexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace calendar_backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PresetsController : Controller
    {
        private readonly CustomizationPresetsDbContext _customizationPresets;
        private readonly UsersDbContext _users;

        public PresetsController(CustomizationPresetsDbContext customizationPresets, UsersDbContext users)
        {
            _customizationPresets = customizationPresets;
            _users = users;
        }

        [HttpPost]
        public async Task<IActionResult> Post(CustomizationPreset preset)
        {
            preset.Id = Guid.NewGuid().ToString();
            preset.UserId = HttpContext.User.Claims.First().Value;
            await _customizationPresets.CustomizationPresets.AddAsync(preset);
            await  _customizationPresets.SaveChangesAsync();
            return new JsonResult(preset);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
           string userId = HttpContext.User.Claims.First().Value;

           IEnumerable<CustomizationPreset> customizationPresets = await _customizationPresets.CustomizationPresets.Where(preset => preset.UserId == userId).ToArrayAsync();
           
           return new JsonResult(customizationPresets);
        }

        [HttpDelete]
        [Route("{presetId}")]
        public async Task<IActionResult> Delete(string presetId)
        {
            string userId = HttpContext.User.Claims.First().Value;

            CustomizationPreset presetToDelete = await _customizationPresets.CustomizationPresets.FirstOrDefaultAsync(preset => preset.Id == presetId && preset.UserId == userId);

            if (presetToDelete != null)
            {
                _customizationPresets.CustomizationPresets.Remove(presetToDelete);
                await _customizationPresets.SaveChangesAsync();
            }

            IEnumerable<CustomizationPreset> updatedPresets =
                await _customizationPresets.CustomizationPresets.Where(preset => preset.UserId == userId).ToArrayAsync();

            return new JsonResult(updatedPresets);
        }
    }
}