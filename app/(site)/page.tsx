import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/actions/getSongs";
export const revalidate = 0;
import PageContent from "./components/PageContent";

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <Header>
        <div>
          <h1 
          className="
          text-white
          text-3xl
          font-semibold
          ">
            Welcome back to Spotifan
          </h1>
          <div
          className="
          grid
          grid-cols-1
          sm:gird-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-3
          mt-4
          "
          >
            <ListItem 
            image = "/images/liked.png"
            name = "Liked Song"
            href = "liked"
            />

          </div>
        </div>

      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Newest Songs</h1>
        </div>
        <PageContent songs = {songs}/>

      </div>
    </div>
  );
}
