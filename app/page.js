import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Reviews from '@/components/Reviews';
import AboutUs from '@/components/AboutUs';
import ContactUs from '@/components/ContactUs';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
    return (
        <ScrollReveal>
            <Hero />
            <div className="reveal">
                <FeaturedProducts />
            </div>
            <div className="reveal">
                <Categories />
            </div>
            <div className="reveal">
                <Reviews />
            </div>
            <div className="reveal">
                <AboutUs />
            </div>
            <div className="reveal">
                <ContactUs />
            </div>
        </ScrollReveal>
    );
}
