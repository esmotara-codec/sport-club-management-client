import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Trophy,
  Users,
  Calendar,
  Award,
  Clock,
  ChevronRight,
  Heart
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Sports Programs', href: '/programs' },
    { name: 'Membership', href: '/membership' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    { name: 'Personal Training', href: '/personal-training' },
    { name: 'Group Classes', href: '/group-classes' },
    { name: 'Sports Coaching', href: '/coaching' },
    { name: 'Equipment Rental', href: '/equipment' },
    { name: 'Facility Booking', href: '/booking' },
    { name: 'Nutritional Guidance', href: '/nutrition' }
  ];

  const sports = [];

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
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-[#108ac2] to-[#0d6fa0] p-3 rounded-2xl">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">SportClub</h3>
                  <p className="text-sm text-gray-400">Excellence in Sports</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Empowering athletes and sports enthusiasts through world-class facilities, 
                expert coaching, and a vibrant community.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#108ac2]" />
                  <p className="text-gray-300">123 Sports Avenue, City 12345</p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#108ac2]" />
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#108ac2]" />
                  <p className="text-gray-300">info@sportclub.com</p>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#108ac2]" />
                  <p className="text-gray-300">Mon - Sun: 6AM - 10PM</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            {/* <div className="space-y-6">
              <h4 className="text-xl font-bold text-white border-b-2 border-[#108ac2] pb-3 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="flex items-center gap-2 text-gray-300 hover:text-[#108ac2] transition-colors duration-300 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white border-b-2 border-[#108ac2] pb-3 inline-block">
                Our Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href={service.href}
                      className="flex items-center gap-2 text-gray-300 hover:text-[#108ac2] transition-colors duration-300 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            {/* <div className="space-y-6">
              <h4 className="text-xl font-bold text-white border-b-2 border-[#108ac2] pb-3 inline-block">
                Contact Us
              </h4>
              
              
            </div> */}
         
        

        {/* Newsletter Section */}
        <div className="flex flex-col ">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Stay Updated</h3>
               </div>
              <div className="flex flex-row gap-3 w-full md:w-auto">
                  {/* <p className="text-gray-400 text-sm">Subscribe for latest updates</p> */}
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#108ac2] transition-colors"
                />
                <button className="bg-gradient-to-r from-[#108ac2] to-[#0d6fa0] text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                  Subscribe
                </button>
              
            </div>
          </div>
         </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <p className="text-gray-400 text-sm">
                  © 2024 SportClub. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
                  <span className="text-gray-600">|</span>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-white/10 p-3 rounded-xl hover:bg-[#108ac2] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#108ac2]/25"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="text-center mt-4 pt-4 border-t border-white/5">
              <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> for sports enthusiasts worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;