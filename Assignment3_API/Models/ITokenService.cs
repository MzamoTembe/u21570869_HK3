namespace Assignment3_Backend.Models
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
