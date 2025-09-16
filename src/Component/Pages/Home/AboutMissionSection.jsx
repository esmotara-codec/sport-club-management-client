import { useState } from 'react';
import { Trophy, Target, Users, Calendar, Award, Star } from 'lucide-react';

const AboutMissionSection = () => {
  const [activeTab, setActiveTab] = useState('history');

  const achievements = [
    { year: '2018', title: 'Club Founded', description: 'Started with 50 passionate members' },
    { year: '2019', title: 'First Championship', description: 'Won regional football tournament' },
    { year: '2021', title: '500+ Members', description: 'Reached milestone membership' },
    { year: '2023', title: 'Multi-Sport Complex', description: 'Opened state-of-the-art facilities' },
    { year: '2024', title: 'Digital Innovation', description: 'Launched management platform' }
  ];

  const missionValues = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Excellence',
      description: 'Striving for the highest standards in sports and personal development'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'Building strong bonds through shared passion for sports and fitness'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Achievement',
      description: 'Celebrating every victory, big or small, in our sporting journey'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Embracing modern technology to enhance the sporting experience'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#108ac2]/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#108ac2]/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#108ac2]/25 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
            <Award className="w-5 h-5 text-[#108ac2]" />
            <span className="text-[#108ac2] font-semibold text-sm uppercase tracking-wider">Our Story</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#108ac2] to-[#0d6fa0]">Passion</span>
            <br />Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d6fa0] to-[#108ac2]">Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From humble beginnings to becoming a premier sports destination, our journey is a testament to the power of community and dedication.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl">
            <button
              onClick={() => setActiveTab('history')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-[#108ac2] to-[#0d6fa0] text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-[#108ac2] hover:bg-[#108ac2]/10'
              }`}
            >
              <Calendar className="w-5 h-5 inline-block mr-2" />
              Our History
            </button>
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'mission'
                  ? 'bg-gradient-to-r from-[#108ac2] to-[#0d6fa0] text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-[#108ac2] hover:bg-[#108ac2]/10'
              }`}
            >
              <Target className="w-5 h-5 inline-block mr-2" />
              Mission & Values
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="animate-fadeIn">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="space-y-6">
                  <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Journey Begins</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      What started as a small group of sports enthusiasts has grown into a thriving community of over 1000+ members. 
                      Our commitment to fostering athletic excellence and personal growth has remained unwavering since day one.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-[#108ac2] to-[#0d6fa0] rounded-full p-3">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">1000+ Active Members</p>
                        <p className="text-sm text-gray-500">Growing every day</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <h4 className="text-2xl font-bold text-gray-800 mb-6">Key Milestones</h4>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-4 group hover:bg-[#108ac2]/5 rounded-xl p-3 transition-colors">
                        <div className="bg-gradient-to-r from-[#108ac2] to-[#0d6fa0] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm shrink-0">
                          {achievement.year}
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800 group-hover:text-[#108ac2] transition-colors">{achievement.title}</h5>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mission Tab */}
          {activeTab === 'mission' && (
            <div className="animate-fadeIn">
              <div className="text-center mb-12">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-4xl mx-auto">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
                  <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    To create an inclusive, innovative, and inspiring environment where athletes of all levels can pursue their passion, 
                    achieve their goals, and build lifelong connections through the power of sport.
                  </p>
                  <div className="flex justify-center">
                    <div className="bg-gradient-to-r from-[#108ac2] to-[#0d6fa0] text-white px-8 py-3 rounded-full font-semibold">
                      Building Champions, Creating Community
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {missionValues.map((value, index) => (
                  <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                    <div className="bg-gradient-to-r from-[#108ac2] to-[#0d6fa0] text-white rounded-2xl w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#108ac2] transition-colors">{value.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutMissionSection;