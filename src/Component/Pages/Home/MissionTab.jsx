import { Star, Target, Trophy, Users } from 'lucide-react';
import React from 'react';
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


const MissionTab = () => {
    return (
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
    );
};

export default MissionTab;