import { categories } from "./_assets/content";
import CardArticle from "./_assets/components/CardArticle";
import CardCategory from "./_assets/components/CardCategory";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import { getData } from "@/utils/fetch";
import { isArray } from "util";

export const metadata = getSEOTags({
  title: `${config.appName} Blog | Stripe Chargeback Protection`,
  description:
    "Discover how to prevent chargebacks, accept payments online, and maintain your Stripe account in good standing",
  canonicalUrlRelative:
    "/blog/?populate[author][populate]=*&populate=blog_image",
});

export default async function Blog() {
  const data = await getData(
    "blogs/?populate[author][populate]=*&populate=blog_image"
  );

  return (
    <>
      <section className="text-center max-w-xl mx-auto mt-24 mb-24 md:mb-32">
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6 text-white">
          The {config.appName} Blog
        </h1>

        <p className="text-lg opacity-80 leading-relaxed text-white">
          Learn how to launch your startup in days, not weeks, and stay updated
          with the latest news about the boilerplate.
        </p>
      </section>

      <section className="grid lg:grid-cols-2 mb-24 md:mb-32 gap-8">
        {data &&
          data?.data &&
          isArray(data?.data) &&
          data?.data?.map((article: any, i: number) => (
            <CardArticle
              article={article}
              key={article.id}
              isImagePriority={i <= 2}
            />
          ))}
      </section>

      <section>
        <p className="font-bold text-2xl lg:text-4xl tracking-tight text-center mb-8 md:mb-12 text-white">
          Browse articles by category
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CardCategory key={category.slug} category={category} tag="div" />
          ))}
        </div>
      </section>
    </>
  );
}
