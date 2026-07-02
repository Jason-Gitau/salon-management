import React from 'react';
import Link from 'next/link';
import {
Home,
Sparkles,
ShoppingBag,
Key,
CalendarDays,
Leaf,
Gem,
ShieldCheck,
Star,
Phone,
MessageCircle,
MapPin,
Mail,
Clock,
ArrowRight
} from 'lucide-react';

export default function MarketingLandingPage() {
return (
<>

  {/* Top Navigation (Web) */}
  <header className="hidden md:flex justify-between items-center px-6 py-4 w-full border-b border-[#8d7167] bg-[#f9f3ea] sticky top-0 z-50">
    <div className="flex items-center gap-4">
      <span className="font-bold text-2xl tracking-tight text-[#a83a00]">
        Luxe Salon Portal
      </span>
    </div>
    <nav className="flex items-center gap-8 font-mono text-sm font-medium">
      <Link href="#" className="text-[#a83a00] font-bold border-b-2 border-[#a83a00] pb-1">
        Home
      </Link>
      <Link href="#services" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">
        Services
      </Link>
      <Link href="#shop" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">
        Shop
      </Link>
      <Link href="#contact" className="text-[#5f5e5e] hover:text-[#a83a00] transition-colors">
        Contact
      </Link>
    </nav>
    <div className="flex items-center gap-4">
      <Link
        href="/cart"
        className="inline-flex items-center justify-center text-[#5f5e5e] hover:text-[#a83a00] transition-colors p-2"
        aria-label="View cart"
      >
        <ShoppingBag size={20} strokeWidth={2} />
      </Link>
      <Link 
        href="/login" 
        className="text-[#1d1b16] font-mono text-sm hover:underline px-3 py-2"
      >
        Log In
      </Link>
      <Link 
        href="/signup" 
        className="bg-[#a83a00] text-white border border-[#8d7167] px-6 py-2 rounded-none font-mono text-sm font-medium hover:bg-[#802a00] transition-colors shadow-sm inline-block"
      >
        Sign Up
      </Link>
    </div>
  </header>

  {/* Bottom Navigation (Mobile) */}
  <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 z-50 border-t border-[#8d7167] rounded-t-xl bg-[#fff9ef]">
    <Link href="#" className="flex flex-col items-center justify-center bg-[#ff7033] text-white rounded-lg p-2 w-16">
      <Home size={20} strokeWidth={2.5} />
      <span className="font-mono text-[10px] mt-1 font-bold">Home</span>
    </Link>
    <Link href="#services" className="flex flex-col items-center justify-center text-[#5f5e5e] p-2 w-16">
      <Sparkles size={20} strokeWidth={2} />
      <span className="font-mono text-[10px] mt-1">Services</span>
    </Link>
    <Link href="#shop" className="flex flex-col items-center justify-center text-[#5f5e5e] p-2 w-16">
      <ShoppingBag size={20} strokeWidth={2} />
      <span className="font-mono text-[10px] mt-1">Store</span>
    </Link>
    <Link href="/login" className="flex flex-col items-center justify-center text-[#5f5e5e] p-2 w-16">
      <Key size={20} strokeWidth={2} />
      <span className="font-mono text-[10px] mt-1">Login</span>
    </Link>
  </nav>

  <main className="w-full max-w-7xl mx-auto">
    
    {/* Hero Section */}
    <section className="relative w-full overflow-hidden border-b border-[#8d7167]">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center p-8 md:p-12 xl:p-16 bg-[#f9f3ea] z-10">
          <span className="font-mono text-xs font-bold text-[#a83a00] mb-4 block uppercase tracking-widest">
            Welcome to Luxe Salon
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1d1b16] mb-6 tracking-tight">
            Elevate Your Natural Beauty
          </h1>
          <p className="text-lg text-[#594139] mb-10 max-w-md leading-relaxed">
            Professional hair treatment, styling, and premium aesthetic services tailored for the modern individual.
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            <Link 
              href="/book/service" 
              className="bg-[#a83a00] text-white border border-[#8d7167] px-8 py-4 font-medium hover:bg-[#802a00] transition-colors flex items-center gap-3"
            >
              <CalendarDays size={18} />
              <span>Book Appointment</span>
            </Link>
            <a 
              href="#services" 
              className="bg-transparent text-[#1d1b16] border border-[#8d7167] px-8 py-4 font-medium hover:bg-[#e7e2d9] transition-colors inline-flex items-center"
            >
              Explore Services
            </a>
          </div>
        </div>
        <div className="relative h-64 md:h-auto border-l border-[#8d7167] bg-[#645d53] overflow-hidden">
          <img 
            className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1000"
            alt="Salon editorial styling"
          />
        </div>
      </div>
    </section>

    {/* Services Section */}
    <section id="services" className="py-16 px-6 md:px-12 border-b border-[#8d7167] bg-[#fff9ef]">
      <div className="flex flex-col items-center mb-16 text-center">
        <Leaf size={32} className="text-[#a83a00] mb-4" strokeWidth={1.5} />
        <h2 className="text-3xl font-bold text-[#1d1b16] mb-2 tracking-tight">
          Our Services & Prices
        </h2>
        <p className="text-[#594139] max-w-lg">
          Discover our range of premium treatments designed to enhance your natural glow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Service Card 1 */}
        <div className="bg-white border border-[#8d7167] group hover:bg-[#f9f3ea] transition-colors duration-300 flex flex-col h-full">
          <div className="relative h-48 border-b border-[#8d7167] overflow-hidden bg-[#645d53]">
            <div className="absolute top-2 left-2 bg-[#fff9ef] border border-[#8d7167] px-2 py-1 font-mono text-xs font-bold z-10">
              01
            </div>
            <img 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
              src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600" 
              alt="Henna art"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow text-center">
            <h3 className="font-bold text-xl text-[#1d1b16] mb-2">Cilaan (Henna)</h3>
            <p className="text-sm text-[#5f5e5e] mb-6 flex-grow">Traditional & modern henna designs for all occasions.</p>
            <div className="bg-[#ffdbce] text-[#802a00] font-mono text-sm font-bold py-2 border border-[#8d7167] w-full">
              $10 - $30
            </div>
          </div>
        </div>

        {/* Service Card 2 */}
        <div className="bg-white border border-[#8d7167] group hover:bg-[#f9f3ea] transition-colors duration-300 flex flex-col h-full">
          <div className="relative h-48 border-b border-[#8d7167] overflow-hidden bg-[#645d53]">
            <div className="absolute top-2 left-2 bg-[#fff9ef] border border-[#8d7167] px-2 py-1 font-mono text-xs font-bold z-10">
              02
            </div>
            <img 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
              src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=600" 
              alt="Hair treatment"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow text-center">
            <h3 className="font-bold text-xl text-[#1d1b16] mb-2">Timo Daweyn</h3>
            <p className="text-sm text-[#5f5e5e] mb-6 flex-grow">Nourishing hair treatment for healthy and strong hair.</p>
            <div className="bg-[#ffdbce] text-[#802a00] font-mono text-sm font-bold py-2 border border-[#8d7167] w-full">
              $20 - $50
            </div>
          </div>
        </div>

        {/* Service Card 3 */}
        <div className="bg-white border border-[#8d7167] group hover:bg-[#f9f3ea] transition-colors duration-300 flex flex-col h-full">
          <div className="relative h-48 border-b border-[#8d7167] overflow-hidden bg-[#645d53]">
            <div className="absolute top-2 left-2 bg-[#fff9ef] border border-[#8d7167] px-2 py-1 font-mono text-xs font-bold z-10">
              03
            </div>
            <img 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600" 
              alt="Hair styling"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow text-center">
            <h3 className="font-bold text-xl text-[#1d1b16] mb-2">Hair Styling</h3>
            <p className="text-sm text-[#5f5e5e] mb-6 flex-grow">Professional hair styling for any event or daily wear.</p>
            <div className="bg-[#ffdbce] text-[#802a00] font-mono text-sm font-bold py-2 border border-[#8d7167] w-full">
              $15 - $40
            </div>
          </div>
        </div>

        {/* Service Card 4 */}
        <div className="bg-white border border-[#8d7167] group hover:bg-[#f9f3ea] transition-colors duration-300 flex flex-col h-full">
          <div className="relative h-48 border-b border-[#8d7167] overflow-hidden bg-[#645d53]">
            <div className="absolute top-2 left-2 bg-[#fff9ef] border border-[#8d7167] px-2 py-1 font-mono text-xs font-bold z-10">
              04
            </div>
            <img 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600" 
              alt="Hair wash"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow text-center">
            <h3 className="font-bold text-xl text-[#1d1b16] mb-2">Hair Wash</h3>
            <p className="text-sm text-[#5f5e5e] mb-6 flex-grow">Deep cleansing and refreshing hair wash experience.</p>
            <div className="bg-[#ffdbce] text-[#802a00] font-mono text-sm font-bold py-2 border border-[#8d7167] w-full">
              $8 - $15
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* Shop Section */}
    <section id="shop" className="py-16 px-6 md:px-12 border-b border-[#8d7167] bg-white">
      <div className="flex flex-col items-center mb-16 text-center">
        <ShoppingBag size={32} className="text-[#a83a00] mb-4" strokeWidth={1.5} />
        <h2 className="text-3xl font-bold text-[#1d1b16] mb-2 tracking-tight">
          Featured Products
        </h2>
        <p className="text-[#594139] max-w-lg">
          Professional-grade hair care products to maintain your salon look at home.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Product 1 */}
        <div className="bg-[#fff9ef] border border-[#8d7167] group hover:bg-[#f9f3ea] transition-colors duration-300 flex flex-col h-full">
          <div className="relative h-64 border-b border-[#8d7167] overflow-hidden bg-[#645d53]">
            <img 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
              src="https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&q=80&w=800" 
              alt="Premium Shampoo"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow text-center">
            <h3 className="font-bold text-xl text-[#1d1b16] mb-2">Nourishing Shampoo</h3>
            <p className="text-sm text-[#5f5e5e] mb-6 flex-grow">Deep hydration for all hair types.</p>
            <div className="text-[#a83a00] font-bold text-2xl mb-4 font-mono">$24.00</div>
            <button className="w-full bg-[#a83a00] text-white border border-[#8d7167] py-3 font-mono text-sm font-medium hover:bg-[#802a00] transition-colors">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product 2 */}
        <div className="bg-[#fff9ef] border border-[#8d7167] group hover:bg-[#f9f3ea] transition-colors duration-300 flex flex-col h-full">
          <div className="relative h-64 border-b border-[#8d7167] overflow-hidden bg-[#645d53]">
            <img 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
              src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800" 
              alt="Organic Hair Oil"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow text-center">
            <h3 className="font-bold text-xl text-[#1d1b16] mb-2">Organic Hair Oil</h3>
            <p className="text-sm text-[#5f5e5e] mb-6 flex-grow">Pure argan oil for shine and strength.</p>
            <div className="text-[#a83a00] font-bold text-2xl mb-4 font-mono">$32.00</div>
            <button className="w-full bg-[#a83a00] text-white border border-[#8d7167] py-3 font-mono text-sm font-medium hover:bg-[#802a00] transition-colors">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product 3 */}
        <div className="bg-[#fff9ef] border border-[#8d7167] group hover:bg-[#f9f3ea] transition-colors duration-300 flex flex-col h-full">
          <div className="relative h-64 border-b border-[#8d7167] overflow-hidden bg-[#645d53]">
            <img 
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
              src="https://images.unsplash.com/photo-1594434296621-5135131953b6?auto=format&fit=crop&q=80&w=800" 
              alt="Styling Clay"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow text-center">
            <h3 className="font-bold text-xl text-[#1d1b16] mb-2">Matte Styling Clay</h3>
            <p className="text-sm text-[#5f5e5e] mb-6 flex-grow">Strong hold with a natural finish.</p>
            <div className="text-[#a83a00] font-bold text-2xl mb-4 font-mono">$18.00</div>
            <button className="w-full bg-[#a83a00] text-white border border-[#8d7167] py-3 font-mono text-sm font-medium hover:bg-[#802a00] transition-colors">
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </section>

    {/* Value Propositions */}
    <section className="py-12 px-6 border-b border-[#8d7167] bg-[#f9f3ea]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-[#8d7167]">
        <div className="flex flex-col items-center text-center p-4">
          <Gem size={32} strokeWidth={1.5} className="text-[#a83a00] mb-4" />
          <h4 className="font-mono text-sm text-[#1d1b16] font-bold mb-1 uppercase">Professional</h4>
          <p className="font-mono text-xs text-[#5f5e5e]">Experienced staff with top-tier skill.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <Leaf size={32} strokeWidth={1.5} className="text-[#a83a00] mb-4" />
          <h4 className="font-mono text-sm text-[#1d1b16] font-bold mb-1 uppercase">Quality Products</h4>
          <p className="font-mono text-xs text-[#5f5e5e]">Premium hair & beauty selections.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <ShieldCheck size={32} strokeWidth={1.5} className="text-[#a83a00] mb-4" />
          <h4 className="font-mono text-sm text-[#1d1b16] font-bold mb-1 uppercase">Clean & Safe</h4>
          <p className="font-mono text-xs text-[#5f5e5e]">Rigorous hygienic environment standards.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <Star size={32} strokeWidth={1.5} className="text-[#a83a00] mb-4" />
          <h4 className="font-mono text-sm text-[#1d1b16] font-bold mb-1 uppercase">Satisfaction</h4>
          <p className="font-mono text-xs text-[#5f5e5e]">Your radiant beauty is our core mission.</p>
        </div>
      </div>
    </section>

    {/* Footer / Contact Block */}
    <footer id="contact" className="bg-[#fff9ef] pt-16 pb-12 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        
        {/* Contact Info */}
        <div>
          <h5 className="font-bold text-xl text-[#1d1b16] mb-6 border-b border-[#8d7167] pb-2 inline-block">
            Contact Us
          </h5>
          <ul className="space-y-4 text-sm text-[#594139] font-mono">
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-[#a83a00]" />
              +254 700 000000
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={16} className="text-[#a83a00]" />
              WhatsApp Support
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-[#a83a00]" />
              Nairobi, Kenya
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-[#a83a00]" />
              support@luxesalonportal.com
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h5 className="font-bold text-xl text-[#1d1b16] mb-6 border-b border-[#8d7167] pb-2 inline-block">
            Platform Support Hours
          </h5>
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-[#a83a00] mt-1" />
            <div className="space-y-4 text-sm font-mono">
              <div>
                <strong className="block text-[#1d1b16]">Monday - Saturday</strong>
                <span className="text-[#5f5e5e]">8:00 AM - 8:00 PM (EAT)</span>
              </div>
              <div>
                <strong className="block text-[#1d1b16]">Sunday</strong>
                <span className="text-[#5f5e5e]">10:00 AM - 6:00 PM (EAT)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#32302a] p-8 border border-[#8d7167] flex flex-col justify-center items-center text-center">
          <h5 className="font-bold text-xl text-white mb-2 tracking-tight">
            Are you a Salon Owner?
          </h5>
          <p className="text-sm text-[#e5e2e1] mb-6 font-mono">
            Digitize your salon, manage staff commissions, and accept M-Pesa today.
          </p>
          <Link 
            href="/signup" 
            className="w-full bg-[#a83a00] text-white border border-[#8d7167] py-4 font-mono text-sm font-bold hover:bg-[#ff7033] transition-colors flex items-center justify-center gap-2"
          >
            Register Your Salon <ArrowRight size={18} />
          </Link>
        </div>

      </div>

      <div className="border-t border-[#8d7167] pt-6 text-center">
        <p className="font-mono text-xs text-[#5f5e5e] flex items-center justify-center gap-2">
          © 2026 Luxe Salon Portal. Powered by Next.js & Supabase.
        </p>
      </div>
    </footer>

  </main>
  </>
);
}
