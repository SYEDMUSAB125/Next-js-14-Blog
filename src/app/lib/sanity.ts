import {createClient} from "next-sanity"
import imageUrlBuilder  from "@sanity/image-url";
export const client = createClient({
    apiVersion:"2023-05-03",
    projectId: '7q9qftex',
    dataset: 'production',
    useCdn:false

})
const builder = imageUrlBuilder(client);
export function urlFor(source:any) {
    return builder.image(source);   
}