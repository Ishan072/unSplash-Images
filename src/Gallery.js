import { useQuery } from "react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_API_KEY}`;
const Gallery = () => {

    const {searchTerm} = useGlobalContext();

    const response = useQuery({
        queryKey: ['images',searchTerm],
        queryFn: async () => {
            const result = await axios.get(`${url}&query=${searchTerm}`);
            return result.data;
        }
    });
    
    if(response.isLoading)
    {
        return (
            <section className="image-container">
                <h4>Loading...</h4>
            </section>
        );
    }
    if(response.error)
    {
        return (
            <section className="image-container">
                <h4>There was an Error...</h4>
            </section>
        );
    }

    const result = response.data.results;
    if(result.length < 1)
    {
        return (
            <section className="image-container">
                <h4>No Image Found...</h4>
            </section>
        );
    }
    return (
        <section className="image-container">
            {result.map((item)=>{
                const url = item?.urls?.regular;
                return ( 
                <img src={url} 
                key={item.id} 
                alt={item.alt_description}
                className="img">
                </img>);
            })}
        </section>
    );
}   

export default Gallery;