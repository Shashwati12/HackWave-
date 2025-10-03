import { Ticket, Calendar, Users, BarChart3, ArrowRight } from 'lucide-react';
import { Background } from '../components/ShootingStar';
import { FloatingNavbar } from '../components/Navbar';

export const Home = () => {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-black">
        
        <div className="absolute inset-0 z-0">
          <Background />
        </div>

        <div className="absolute inset-0 bg-black/40 z-10" />

        <FloatingNavbar />

        <div className="relative z-20 max-w-[1400px] mx-auto px-8 pt-40 pb-32">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-[#36C1F6] to-[#657FFF] bg-clip-text text-transparent mb-6 leading-tight">
                Events without the chaos
              </h1>
              <p className="text-xl text-[#B0B3C0] mb-10 leading-relaxed">
                Stop juggling spreadsheets and email threads. Manage registrations, tickets, and attendees in one place.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <button className="flex items-center gap-2 px-6 py-3 bg-cyan-300 text-black font-medium rounded hover:bg-white/90">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </button>
                
              </div>

            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="relative">
              
              {/* Floating Card - Event Preview */}
              <div className="absolute -top-8 left-0 w-80 p-5 bg-black/60 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-white font-medium mb-1">Design Conference 2025</div>
                    <div className="text-[#B0B3C0] text-sm">March 15-17, 2025</div>
                  </div>
                  <div className="px-2 py-1 bg-[#16D3AC]/20 rounded text-[#16D3AC] text-xs">
                    Published
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#B0B3C0]">
                    <Users className="w-4 h-4" />
                    <span>1,247</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#B0B3C0]">
                    <Ticket className="w-4 h-4" />
                    <span>892 sold</span>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#36C1F6] to-[#16D3AC] rounded-full" style={{width: '71%'}} />
                </div>
              </div>

              <div className="mt-20 p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                  <div>
                    <div className="text-white font-medium mb-1">Your Events</div>
                    <div className="text-[#B0B3C0] text-sm">Last 30 days</div>
                  </div>
                  <button className="px-4 py-2 bg-[#16D3AC] text-black text-sm font-medium rounded hover:bg-[#16D3AC]/90">
                    Create Event
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">24</div>
                    <div className="text-[#B0B3C0] text-xs">Active Events</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">8.2K</div>
                    <div className="text-[#B0B3C0] text-xs">Attendees</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">94%</div>
                    <div className="text-[#B0B3C0] text-xs">Check-in Rate</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-white text-sm font-medium mb-3">Recent Activity</div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-[#36C1F6]/20 flex items-center justify-center">
                      <Ticket className="w-5 h-5 text-[#36C1F6]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm">New registration</div>
                      <div className="text-[#B0B3C0] text-xs">Tech Summit • 2 min ago</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-[#657FFF]/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#657FFF]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm">Event published</div>
                      <div className="text-[#B0B3C0] text-xs">Workshop Series • 1 hour ago</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-[#16D3AC]/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-[#16D3AC]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm">Report generated</div>
                      <div className="text-[#B0B3C0] text-xs">Q1 Analytics • 3 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mini Card */}
              <div className="absolute -bottom-6 -right-4 w-64 p-4 bg-black/60 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">Revenue</span>
                  <span className="text-[#16D3AC] text-xs">+18%</span>
                </div>
                <div className="text-white text-2xl font-bold mb-3">$47,892</div>
                <div className="flex items-end gap-1 h-16">
                  <div className="flex-1 bg-white/20 rounded" style={{height: '40%'}} />
                  <div className="flex-1 bg-white/20 rounded" style={{height: '65%'}} />
                  <div className="flex-1 bg-white/20 rounded" style={{height: '50%'}} />
                  <div className="flex-1 bg-[#16D3AC] rounded" style={{height: '85%'}} />
                  <div className="flex-1 bg-[#16D3AC] rounded" style={{height: '100%'}} />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};