import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Trophy,
  Clock,
  ChevronRight,
  Heart
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courts', href: '/contact' },
  ];

  const services = [
    { name: 'Personal Training', href: '/personal-training' },
    { name: 'Group Classes', href: '/group-classes' },
    { name: 'Sports Coaching', href: '/coaching' },
    { name: 'Facility Booking', href: '/booking' },
    { name: 'Nutritional Guidance', href: '/nutrition' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: '#' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: '#' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, href: '#' },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" />, href: '#' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#108ac2]/20 to-transparent"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#108ac2]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#108ac2]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container px-4  py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-5 gap-8 lg:gap-5 ">
            
            {/* Company Info */}
            <div className="space-y-4 md:space-y-6 text-center sm:text-left">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-xl md:text-2xl font-bold text-white">
                    Sport<span className="text-blue-400">Club</span>
                  </h1>
                  <p className="text-xs md:text-sm text-gray-400">Excellence in Sports</p>
                </div>
              </div>
              
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                Empowering athletes and sports enthusiasts through world-class facilities, 
                expert coaching, and a vibrant community.
              </p>

              {/* Contact Information */}
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3 justify-center sm:justify-start">
                  <MapPin className="w-5 h-5 text-[#108ac2] flex-shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base text-gray-300 text-left">123 Sports Avenue, City 12345</p>
                </div>

                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <Phone className="w-5 h-5 text-[#108ac2] flex-shrink-0" />
                  <p className="text-sm md:text-base text-gray-300">+1 (555) 123-4567</p>
                </div>

                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <Mail className="w-5 h-5 text-[#108ac2] flex-shrink-0" />
                  <p className="text-sm md:text-base text-gray-300">info@sportclub.com</p>
                </div>

                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <Clock className="w-5 h-5 text-[#108ac2] flex-shrink-0" />
                  <p className="text-sm md:text-base text-gray-300">Mon - Sun: 6AM - 10PM</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 md:space-y-6 text-center sm:text-left">
              <h4 className="text-lg md:text-xl font-bold text-white border-b-2 border-[#108ac2] pb-2 md:pb-3 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="flex items-center gap-2 text-sm md:text-base text-gray-300 hover:text-[#108ac2] transition-colors duration-300 group justify-center sm:justify-start"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4 md:space-y-6 text-center sm:text-left">
              <h4 className="text-lg md:text-xl font-bold text-white border-b-2 border-[#108ac2] pb-2 md:pb-3 inline-block">
                Our Services
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href={service.href}
                      className="flex items-center gap-2 text-sm md:text-base text-gray-300 hover:text-[#108ac2] transition-colors duration-300 group justify-center sm:justify-start"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4 md:space-y-6 text-center sm:text-left">
              <h4 className="text-lg md:text-xl font-bold text-white border-b-2 border-[#108ac2] pb-2 md:pb-3 inline-block">
                Legal
              </h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <a 
                    href="#"
                    className="flex items-center gap-2 text-sm md:text-base text-gray-300 hover:text-[#108ac2] transition-colors duration-300 group justify-center sm:justify-start"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    className="flex items-center gap-2 text-sm md:text-base text-gray-300 hover:text-[#108ac2] transition-colors duration-300 group justify-center sm:justify-start"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter & Social Section */}
            <div className="space-y-4 md:space-y-6 text-center sm:text-left">
              {/* Newsletter */}
              <div className="space-y-3 md:space-y-4">
                <h4 className="text-lg md:text-xl font-bold text-white">Stay Updated</h4>
                <div className="flex flex-col sm:flex-row  gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 lg:px-2 py-2 text-sm md:text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#108ac2] transition-colors"
                  />
                  <button className="bg-gradient-to-r from-[#108ac2] to-[#0d6fa0] text-white px-4 md:px-4 py-2 text-sm md:text-base rounded-lg font-medium hover:shadow-lg transition-all whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-3 md:space-y-6">
                <h4 className="text-lg md:text-xl font-bold text-white pt-2 md:pt-5">Follow Us</h4>
                <div className="flex gap-3 justify-center sm:justify-start">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="bg-white/10 p-2.5 md:p-3 rounded-lg hover:bg-[#108ac2] transition-all duration-300 hover:scale-105"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left">
              <div className="flex items-center gap-6">
                <p className="text-gray-400 text-xs md:text-sm">
                  © 2024 SportClub. All rights reserved.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-xs md:text-sm flex items-center gap-2">
                  Made with <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 animate-pulse" /> for sports enthusiasts worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;