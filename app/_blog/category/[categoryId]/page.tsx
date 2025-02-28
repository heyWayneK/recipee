import { categories } from "../../_assets/content";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import { getData } from "@/utils/fetch";
import CardArticle from "../../_assets/components/CardArticle";
import CardCategory from "../../_assets/components/CardCategory";

export async function generateMetadata({
  params,
}: {
  params: {
    categoryId: string;
  };
}) {
  const category = categories.find(
    (category) => category.slug === params.categoryId
  );

  return getSEOTags({
    title: `${category.title} | Blog by ${config.appName}`,
    description: category.description,
    canonicalUrlRelative: `/blog/category/${category.slug}`,
  });
}

export default async function Category({
  params,
}: {
  params: {
    categoryId: string;
  };
}) {
  const category = categories.find(
    (category) => category.slug?.toLowerCase() === params.categoryId
  );

  const data = await getData(
    `blogs/?filters[category][$eq]=${
      params?.categoryId?.slice(0, 1)?.toUpperCase() +
      params?.categoryId?.slice(1)
    }&populate[author][populate]=*&populate=blog_image`
  );

  return (
    <>
      <section className="mt-24 mb-24 md:mb-32 max-w-3xl mx-auto text-center">
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6 md:mb-12 text-white">
          {category.title}
        </h1>

        <p className="md:text-lg opacity-80 max-w-xl mx-auto text-white">
          {category.description}
        </p>
      </section>

      <section className="mb-24">
        <h2 className="font-bold text-2xl lg:text-4xl tracking-tight text-center mb-8 md:mb-12 text-white">
          Most recent articles in {category.title}
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {data?.data?.map((article: any) => (
            <CardArticle
              key={article.id}
              article={article}
              tag="h3"
              showCategory={false}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-bold text-2xl lg:text-4xl tracking-tight text-center mb-8 md:mb-12 text-white">
          Other categories you might like
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((category) => (
              <CardCategory key={category.slug} category={category} tag="h3" />
            ))}
        </div>
      </section>
    </>
  );
}
