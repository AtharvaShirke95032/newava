'use client';

export default function Navbar() {
  return (
    <nav className="w-full h-[72px] bg-[#5C2A2A] fixed top-0 z-50 border-b-[2px] border-[#FFED00] flex items-center px-8">
      
      {/* LEFT - CYBERPUNK LOGO */}
      <div className="flex items-center">
        <span className="text-2xl font-bold uppercase tracking-wider" style={{
          color: '#FFED00',
          textShadow: '0 0 10px #FFED00, 0 0 20px #FFED00, 1px 1px 0 #00BFFF, -1px -1px 0 #00BFFF, 1px -1px 0 #00BFFF, -1px 1px 0 #00BFFF',
          fontFamily: 'Orbitron, sans-serif',
          letterSpacing: '0.1em'
        }}>
          Cyberpunk
        </span>
      </div>

      {/* CENTER - MENU */}
      <ul className="flex items-center gap-8 mx-auto text-sm font-semibold tracking-wider text-white uppercase">
        {['GAMES', 'SHOWS', 'NEWS', 'COMMUNITY', 'MORE'].map((item) => (
          <li
            key={item}
            className="flex items-center cursor-pointer hover:text-[#FFED00] transition-colors"
          >
            {item}
            <span className="ml-1 text-[#FFED00] text-xs">▾</span>
          </li>
        ))}
      </ul>

      {/* RIGHT - LANGUAGE + BUY */}
      <div className="flex items-center gap-6">
        <button className="flex items-center text-white text-sm font-semibold hover:text-[#FFED00] transition uppercase">
          EN <span className="ml-1 text-[#FFED00] text-xs">▾</span>
        </button>

        <button className="relative bg-[#FFED00] text-black px-6 py-2.5 text-sm font-bold uppercase tracking-wide clip-btn hover:bg-[#FFD700] transition">
          BUY NOW
        </button>
      </div>
    </nav>
  );
}
