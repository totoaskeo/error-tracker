using AutoMapper;
using ErrorTracker.Dtos;
using ErrorTrackerApp.Dtos;
using ErrorTrackerApp.Models;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<Error, ErrorDto>();
            CreateMap<ErrorDto, Error>();
            CreateMap<ErrorHistory, ErrorHistoryDto>();
            CreateMap<ErrorHistoryDto, ErrorHistory>();
        }
    }
}