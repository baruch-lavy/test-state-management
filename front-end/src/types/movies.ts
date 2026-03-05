type seat = {
  id: number;
  numberX: number;
  numberY: number;
  isTaken: boolean;
}

export type Movie = {
    Title:string
    Year :string
    Rated :string
    Released :string
    Runtime :string
    Genre :string
    Director :string
    Writer :string
    Actors :string
    Plot :string
    Language :string
    Country :string
    Awards :string
    Poster :string
    Metascore :string
    ibmdRating :string
    ibmdVotes :string
    imdbID :string
    Type :string
    Response :string
    Images: Array<string>
    seats: seat[]
}
 