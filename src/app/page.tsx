import { Card, CardContent } from "@/components/ui/card";
import { SampleCard } from "./lib/interfaces";
import { client, urlFor } from "./lib/sanity"
export const revalidate = 30;

import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Link from "next/link";
async function getData(){
const query = `*[_type == "blog"] | order(_createdAt desc){
  title,
  smallDescription,
  "currentSlug":slug.current,
  titleImage
}`
const data = await client.fetch(query);
return data;
}

export default async function Home() {
  const data:SampleCard[]= await getData();
  // console.log(data);
  return (<div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
    {
      data.map((index,key)=>{
return(
  <Card key={key}>
    <Image src={urlFor(index.titleImage).url()} alt="image" width={500} height={500} className="rounded-t-lg h-[200px] object-cover"/>
    <CardContent >
    <h3  className="text-lg line-clamp-2">
      {index.title}
    </h3>
    <p className="mt-3 text-sm line-clamp-3 text-gray-600 dark:text-gray-300">{index.smallDescription}</p>
    <Button asChild className="w-full mt-3 dark: hover:text-white-500">
      <Link href={`/blog/${index.currentSlug}`}>Read more</Link>
    </Button>
  </CardContent>
  </Card>
 

)
      })
    }
    
  </div>
   
  )
}
