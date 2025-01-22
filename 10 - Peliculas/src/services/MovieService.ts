
export interface IMovie{
    title:string,
    imageUrl?:string,
    year: string,
    id?:string
}

export interface IPageMovie{
    movies:IMovie[],
    currentPage:number,
    lastPage:number,
    url?:string
}

interface IOmdbResult{
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

export default class MovieService{
    private ApiKey:string;
    private endpoint:string= 'http://omdbapi.com/?apikey=';
    private localResponse:unknown;

    private constructor(apikey:string='', localResponse?:unknown){
        this.ApiKey=apikey;
        this.localResponse=localResponse;
    }

    public static new(apikey:string='', localResponse?:unknown){
        return new MovieService(apikey, localResponse);
    }

    public async searchMovies(title:string, year?:string, page:number=1):Promise<IPageMovie | undefined>{
        let search;
        const url = this.getBaseUrl();

        if(!this.localResponse){
            const response = await fetch(`${url}&s=${title}&page=${page}&type=movie${year?'&y='+year:''}`);
            if(!response.ok)return;

            search = await response.json();
        }else{
            search = this.localResponse;
        }
        
        if(!search.Response)return;
        
        return  {
            currentPage: 1,
            lastPage: Math.ceil(Number.parseFloat(search.totalResults)),
            movies:(search.Search ?? []).map((movie:IOmdbResult) =>({
                title:movie.Title, 
                imageUrl:movie.Poster, 
                year:movie.Year, 
                id:movie.imdbID, 
            })),
            url: `${url}&s=${title}&type=movie${year?'&y='+year:''}`
        };
    }

    public async loadNextPage(pageMovie: IPageMovie){
        const page = pageMovie.currentPage + 1;

        if(page>pageMovie.lastPage)return {...pageMovie};

        const response = await fetch(`${pageMovie.url}&page=${page}`);
        if(!response.ok)return {...pageMovie};

        const search = await response.json();

        if(!search.Response)return {...pageMovie};

        return  {
            ...pageMovie,
            currentPage:page,
            movies:[...pageMovie.movies].concat((search.Search ?? []).map((movie:IOmdbResult) =>({
                title:movie.Title, 
                imageUrl:movie.Poster, 
                year:movie.Year, 
                id:movie.imdbID, 
            })))
        };
    }

    public async isValidApiKey():Promise<boolean>{
        const url = this.getBaseUrl();
        const response = await fetch(url);
        
        if(!response.ok)return false;

        const json = await response.json();

        return !(json.Error?.includes('Invalid') ?? true);
    }

    private getBaseUrl():string{
        return `${this.endpoint}${this.ApiKey}`;
    }
}