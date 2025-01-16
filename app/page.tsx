// Craft Imports
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";

// Components
import Link from "next/link";

// Icons
import { File, Pen, Tag, Boxes, User, Folder } from "lucide-react";

// This page is using the craft.tsx component and design system
export default function Home() {
  return (
    <Section>
      <Container>
        <Landing />
      </Container>
    </Section>
  );
}

const Landing = () => {
  return (
    <article className="prose-m-none">
      <h1>
        <Balancer>
          Merhaba, Next.js ve WordPress ile geliştirdiğim web siteme hoş
          geldiniz!
        </Balancer>
      </h1>
      <p>
        Bu web sitesi, Next.js ve WordPress entegrasyonu ile güçlü ve esnek bir
        çözüm sunmaktadır. Hem modern frontend teknolojisi hem de güçlü bir
        içerik yönetim sistemiyle oluşturulmuş bu site, farklı içerik türlerini
        kolayca yönetmenizi sağlar. Blog yazıları, hizmetler ve projeler gibi
        farklı alanlara hızlı erişim sağlamak için tasarlandı.
      </p>

      <section className="my-8">
        <h2 className="text-xl font-semibold">Sayfalar</h2>
        <p>Wordpress üzerinden sayfa ekleyebilir, düzenleyebilirsiniz.</p>
        <div className="flex space-x-6 mt-4">
          <Link
            href="/hakkimizda"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <User className="mr-2 h-6 w-6" /> Hakkımızda
          </Link>
          <Link
            href="/ornek-sayfa"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Folder className="mr-2 h-6 w-6" /> Örnek Sayfa
          </Link>
        </div>
      </section>

      {/* Blog Bölümü */}
      <section className="my-8">
        <h2 className="text-xl font-semibold">Blog</h2>
        <p>
          WordPress üzerinden yönetilen blog sayfamda yazılarımı bulabilirsiniz.
        </p>
        <div className="flex space-x-6 mt-4">
          <Link
            href="/blog"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Pen className="mr-2 h-6 w-6" /> Yazılara Göz At
          </Link>
        </div>
      </section>
    </article>
  );
};
