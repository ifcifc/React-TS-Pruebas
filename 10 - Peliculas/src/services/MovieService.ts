
export interface IMovie{
    title:string,
    imageUrl?:string,
    year: string,
    id?:string
}

export interface IPageMovie{
    movies:IMovie[],
    currentPage:number,
    lastPage:number
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

    public async searchMovies(title:string, year?:string):Promise<IMovie[] | undefined>{
        let search;
        if(!this.localResponse){
            const url = this.getBaseUrl();
            const response = await fetch(`${url}&s=${title}&type=movie${year?'&y='+year:''}`);
            if(!response.ok)return;

            search = await response.json();
        }else{
            search = this.localResponse;
        }
        
        if(!search.Response)return;
        


        return (search.Search ?? []).map((movie:IOmdbResult) =>({
            title:movie.Title, 
            imageUrl:movie.Poster, 
            year:movie.Year, 
            id:movie.imdbID, 
        } as IMovie));
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