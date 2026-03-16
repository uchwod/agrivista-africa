from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    open_meteo_base: str = "https://api.open-meteo.com"
    open_meteo_archive_base: str = "https://archive-api.open-meteo.com"
    nasa_power_base: str = "https://power.larc.nasa.gov/api/temporal/daily"
    faostat_api_base: str = "https://fenixservices.fao.org/faostat/api/v1/en/data"
    api_host: str = "0.0.0.0"
    api_port: int = 8000

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
