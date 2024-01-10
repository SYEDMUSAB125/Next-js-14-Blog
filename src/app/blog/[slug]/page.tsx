import { IBlog } from "@/app/lib/interfaces";
import { client, urlFor } from "../../lib/sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
export const revalidate = 30;


async function getData(slug:String){
    // const Slug = slug;
    // console.log(Slug)
const query = `*[_type == "blog" && slug.current == '${slug}']{
    "currentSlug":slug.current,
    title,
    content,
    titleImage   
}[0]`
// *[_type == "blog" && slug.current == "mastering-efficiency-and-style-unveiling-the-power-of-tailwind-css" ]{
//     "currentSlug":slug.current,
//     title,
//     content,
//     titleImage   
// }
const data = await client.fetch(query);
// console.log(data)
return data;
}

export default async function MoreBlog({params}:{params:{slug:String}}){
    const data:IBlog = await getData(params.slug)
    // console.log(data)
    // console.log(params.slug)
    return(
        <div>
            <h1 className="mt-2">
                <span className="block text-base font-semibold  text-center tracking-wide uppercase text-primary">Tech Pulse-Blog</span> 
                 <span className="mt-2 block text-3xl text-center tracking-tight leading-8 font-bold uppercase sm:text-4xl">{data.title} 
                 </span> 
                
            </h1>
            <Image src={urlFor(data.titleImage).url()} width={700} height={700} alt='article image' className=" rounded-2xl mt-8 border" priority />

           <div className="mt-16 prose prose-xl prose-li:marker:text-primary dark:prose-invert ">
            <PortableText value={data.content}/>
            </div> 
        </div>
    

        
    )
} 