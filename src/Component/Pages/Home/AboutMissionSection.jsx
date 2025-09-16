import { useState } from 'react';
import { Target,  Calendar, Award} from 'lucide-react';
import HistoryTab from './HistoryTab';
import MissionTab from './MissionTab';

const AboutMissionSection = () => {
  const [activeTab, setActiveTab] = useState('history');



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
           <HistoryTab/>
          )}

          {/* Mission Tab */}
          {activeTab === 'mission' && (
            <MissionTab/>
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