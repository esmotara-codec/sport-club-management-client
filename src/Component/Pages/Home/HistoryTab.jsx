import { Trophy } from 'lucide-react';
import React from 'react';

const achievements = [
    { year: '2018', title: 'Club Founded', description: 'Started with 50 passionate members' },
    { year: '2019', title: 'First Championship', description: 'Won regional football tournament' },
    { year: '2021', title: '500+ Members', description: 'Reached milestone membership' },
    { year: '2023', title: 'Multi-Sport Complex', description: 'Opened state-of-the-art facilities' },
    { year: '2024', title: 'Digital Innovation', description: 'Launched management platform' }
  ];
const HistoryTab = () => {
    return (
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
    );
};

export default HistoryTab;