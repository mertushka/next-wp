import { getPageBySlug } from "@/lib/wordpress";
import { Section, Container, Main } from "@/components/craft";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import BackButton from "@/components/back";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | Boolean> {
  const page = await getPageBySlug(params.slug);
  if (!page) return false;
  return {
    title: page.title.rendered,
    description: page.excerpt.rendered,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page) return notFound();

  return (
    <Section>
      <Container>
        <BackButton />
        <h1 className="pt-12">{page.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </Container>
    </Section>
  );
}
